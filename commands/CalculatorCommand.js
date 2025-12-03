import { BaseCommand } from './BaseCommand.js';

export class CalculatorCommand extends BaseCommand {
    constructor() {
        super('calculate', ['calculate', 'math', 'compute', 'what is'], 'Perform calculations and unit conversions');
    }

    matches(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        return lowerPrompt.includes('calculate') || 
               lowerPrompt.includes('what is') ||
               lowerPrompt.includes('convert') ||
               /\d+\s*[\+\-\*\/\%]\s*\d+/.test(prompt) ||
               lowerPrompt.includes('math');
    }

    convertUnits(value, fromUnit, toUnit) {
        const conversions = {
            // Length
            'meter': { 'feet': 3.28084, 'inch': 39.3701, 'cm': 100, 'km': 0.001 },
            'feet': { 'meter': 0.3048, 'inch': 12, 'cm': 30.48, 'km': 0.0003048 },
            'inch': { 'meter': 0.0254, 'feet': 0.0833333, 'cm': 2.54, 'km': 0.0000254 },
            'cm': { 'meter': 0.01, 'feet': 0.0328084, 'inch': 0.393701, 'km': 0.00001 },
            'km': { 'meter': 1000, 'feet': 3280.84, 'inch': 39370.1, 'cm': 100000 },
            
            // Weight
            'kg': { 'pound': 2.20462, 'gram': 1000, 'ounce': 35.274 },
            'pound': { 'kg': 0.453592, 'gram': 453.592, 'ounce': 16 },
            'gram': { 'kg': 0.001, 'pound': 0.00220462, 'ounce': 0.035274 },
            
            // Temperature (special handling required)
            'celsius': { 'fahrenheit': (c) => (c * 9/5) + 32, 'kelvin': (c) => c + 273.15 },
            'fahrenheit': { 'celsius': (f) => (f - 32) * 5/9, 'kelvin': (f) => ((f - 32) * 5/9) + 273.15 },
            'kelvin': { 'celsius': (k) => k - 273.15, 'fahrenheit': (k) => ((k - 273.15) * 9/5) + 32 }
        };

        fromUnit = fromUnit.toLowerCase();
        toUnit = toUnit.toLowerCase();

        // Handle temperature conversions
        if (['celsius', 'fahrenheit', 'kelvin'].includes(fromUnit)) {
            if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
                return typeof conversions[fromUnit][toUnit] === 'function' 
                    ? conversions[fromUnit][toUnit](value)
                    : value * conversions[fromUnit][toUnit];
            }
        }

        // Handle other conversions
        if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
            return value * conversions[fromUnit][toUnit];
        }

        return null;
    }

    evaluateExpression(expression) {
        try {
            // Replace word operators
            expression = expression
                .replace(/\bplus\b/gi, '+')
                .replace(/\bminus\b/gi, '-')
                .replace(/\btimes\b/gi, '*')
                .replace(/\bmultiplied by\b/gi, '*')
                .replace(/\bdivided by\b/gi, '/')
                .replace(/\bpercent of\b/gi, '* 0.01 *');

            // Security: Only allow numbers, operators, parentheses, and decimals
            if (!/^[\d\+\-\*\/\(\)\.\s%]+$/.test(expression)) {
                return null;
            }

            // Use Function constructor for safe evaluation
            return Function(`"use strict"; return (${expression})`)();
        } catch (error) {
            return null;
        }
    }

    async execute(prompt, res) {
        this.logExecuting();
        
        try {
            const lowerPrompt = prompt.toLowerCase();
            
            // Unit conversion
            const conversionMatch = prompt.match(/convert (\d+(?:\.\d+)?)\s*(\w+)\s*to\s*(\w+)/i);
            if (conversionMatch) {
                const [, value, fromUnit, toUnit] = conversionMatch;
                const result = this.convertUnits(parseFloat(value), fromUnit, toUnit);
                
                if (result !== null) {
                    res.json({ response: `${value} ${fromUnit} is ${result.toFixed(2)} ${toUnit}.` });
                } else {
                    res.json({ response: `Sorry, I cannot convert from ${fromUnit} to ${toUnit}.` });
                }
                return;
            }

            // Math calculations
            const mathMatch = prompt.match(/(?:calculate|what is|math)\s*(.+)/i) || 
                             prompt.match(/(\d+(?:\.\d+)?\s*[\+\-\*\/\%]\s*\d+(?:\.\d+)?.*)/);
            
            if (mathMatch) {
                const expression = mathMatch[1].trim();
                const result = this.evaluateExpression(expression);
                
                if (result !== null && !isNaN(result)) {
                    res.json({ response: `The answer is ${result}.` });
                } else {
                    res.json({ response: 'Sorry, I could not calculate that expression.' });
                }
                return;
            }

            res.json({ response: 'Please provide a calculation or conversion request.' });
            
        } catch (error) {
            this.handleError(error, res, 'Failed to perform calculation');
        }
    }
}
