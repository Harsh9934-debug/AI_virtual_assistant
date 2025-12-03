import fs from 'fs/promises';
import path from 'path';
import { BaseCommand } from './BaseCommand.js';

export class TodoCommand extends BaseCommand {
    constructor() {
        super('todo', ['add task', 'create task', 'todo list', 'complete task'], 'Manage to-do list');
        this.todoFile = path.join(process.cwd(), 'data', 'todos.json');
        this.ensureTodoDirectory();
    }

    async ensureTodoDirectory() {
        try {
            const dataDir = path.dirname(this.todoFile);
            await fs.mkdir(dataDir, { recursive: true });
        } catch (error) {
            console.error('Failed to create todo directory:', error);
        }
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('add task') || 
               lowerPrompt.includes('create task') ||
               lowerPrompt.includes('todo') ||
               lowerPrompt.includes('complete task') ||
               lowerPrompt.includes('show tasks');
    }

    async loadTodos() {
        try {
            const data = await fs.readFile(this.todoFile, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveTodos(todos) {
        try {
            await fs.writeFile(this.todoFile, JSON.stringify(todos, null, 2));
        } catch (error) {
            throw new Error('Failed to save todos');
        }
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const lowerPrompt = prompt.toLowerCase();

            if (lowerPrompt.includes('todo list') || lowerPrompt.includes('show tasks')) {
                const todos = await this.loadTodos();
                const pendingTodos = todos.filter(todo => !todo.completed);
                
                if (pendingTodos.length === 0) {
                    res.json({ response: 'Your to-do list is empty. Great job!' });
                } else {
                    const todosList = pendingTodos
                        .map((todo, index) => `${index + 1}. ${todo.content}`)
                        .join('\n');
                    res.json({ response: `Here are your pending tasks:\n${todosList}` });
                }
                return;
            }

            if (lowerPrompt.includes('complete task')) {
                const taskMatch = prompt.match(/complete task:?\s*(.+)/i);
                if (taskMatch) {
                    const taskContent = taskMatch[1].trim();
                    const todos = await this.loadTodos();
                    const todoIndex = todos.findIndex(todo => 
                        todo.content.toLowerCase().includes(taskContent.toLowerCase()) && !todo.completed
                    );

                    if (todoIndex !== -1) {
                        todos[todoIndex].completed = true;
                        todos[todoIndex].completedAt = new Date().toISOString();
                        await this.saveTodos(todos);
                        res.json({ response: `Task completed: "${todos[todoIndex].content}"` });
                    } else {
                        res.json({ response: 'Task not found in your to-do list.' });
                    }
                } else {
                    res.json({ response: 'Please specify which task to complete.' });
                }
                return;
            }

            const taskMatch = prompt.match(/(?:add|create)\s+task:?\s*(.+)/i);
            if (taskMatch) {
                const taskContent = taskMatch[1].trim();
                const todos = await this.loadTodos();
                
                const newTodo = {
                    id: Date.now(),
                    content: taskContent,
                    completed: false,
                    createdAt: new Date().toISOString()
                };

                todos.push(newTodo);
                await this.saveTodos(todos);

                this.logSuccess(`Task added: ${taskContent}`);
                res.json({ response: `Task added to your list: "${taskContent}"` });
            } else {
                res.json({ response: 'Please specify the task. For example: "Add task: Call dentist"' });
            }

        } catch (error) {
            this.handleError(error, res, 'Failed to manage todo list');
        }
    }
}
