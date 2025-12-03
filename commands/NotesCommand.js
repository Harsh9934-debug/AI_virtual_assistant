import fs from 'fs/promises';
import path from 'path';
import { BaseCommand } from './BaseCommand.js';

export class NotesCommand extends BaseCommand {
    constructor() {
        super('notes', ['take note', 'save note', 'create note', 'read notes'], 'Take and manage notes');
        this.notesFile = path.join(process.cwd(), 'data', 'notes.json');
        this.ensureNotesDirectory();
    }

    async ensureNotesDirectory() {
        try {
            const dataDir = path.dirname(this.notesFile);
            await fs.mkdir(dataDir, { recursive: true });
        } catch (error) {
            console.error('Failed to create notes directory:', error);
        }
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('take note') || 
               lowerPrompt.includes('save note') ||
               lowerPrompt.includes('create note') ||
               lowerPrompt.includes('read notes') ||
               lowerPrompt.includes('show notes');
    }

    async loadNotes() {
        try {
            const data = await fs.readFile(this.notesFile, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveNotes(notes) {
        try {
            await fs.writeFile(this.notesFile, JSON.stringify(notes, null, 2));
        } catch (error) {
            throw new Error('Failed to save notes');
        }
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const lowerPrompt = prompt.toLowerCase();

            if (lowerPrompt.includes('read notes') || lowerPrompt.includes('show notes')) {
                const notes = await this.loadNotes();
                if (notes.length === 0) {
                    res.json({ response: 'You have no notes saved.' });
                } else {
                    const notesList = notes
                        .slice(-5)
                        .map((note, index) => `${index + 1}. ${note.content} (${new Date(note.timestamp).toLocaleDateString()})`)
                        .join('\n');
                    res.json({ response: `Here are your recent notes:\n${notesList}` });
                }
                return;
            }

            const noteMatch = prompt.match(/(?:take|save|create)\s+note:?\s*(.+)/i);
            if (noteMatch) {
                const noteContent = noteMatch[1].trim();
                const notes = await this.loadNotes();
                
                const newNote = {
                    id: Date.now(),
                    content: noteContent,
                    timestamp: new Date().toISOString()
                };

                notes.push(newNote);
                await this.saveNotes(notes);

                this.logSuccess(`Note saved: ${noteContent}`);
                res.json({ response: `Note saved: "${noteContent}"` });
            } else {
                res.json({ response: 'Please specify what to note. For example: "Take note: Buy groceries"' });
            }

        } catch (error) {
            this.handleError(error, res, 'Failed to manage notes');
        }
    }
}
