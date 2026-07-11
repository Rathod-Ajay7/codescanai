import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeCode, generateFixedCode } from './analyze';

// Create a mock function in parent scope prefixed with 'mock' so Vitest allows it
const mockGenerateContent = vi.fn();

vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: function () {
      return {
        getGenerativeModel: function () {
          return {
            generateContent: mockGenerateContent,
          };
        },
      };
    },
  };
});

describe('analyzeCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully parse valid JSON results from the model', async () => {
    const mockResponseText = JSON.stringify({
      bugs: ["Line 2: Missing semicolon"],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      suggestion: "Use const instead of let"
    });

    mockGenerateContent.mockResolvedValueOnce({
      response: {
        text: () => mockResponseText
      }
    });

    const result = await analyzeCode('let x = 5', 'javascript');
    expect(result).toEqual({
      bugs: ["Line 2: Missing semicolon"],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      suggestion: "Use const instead of let"
    });
  });

  it('should handle and return language mismatch errors', async () => {
    const mockResponseText = JSON.stringify({
      error: "Code language does not match selected language. Please select the correct language."
    });

    mockGenerateContent.mockResolvedValueOnce({
      response: {
        text: () => mockResponseText
      }
    });

    const result = await analyzeCode('interface User {}', 'javascript');
    expect(result).toEqual({
      error: "Code language does not match selected language. Please select the correct language."
    });
  });

  it('should throw an error if no JSON is returned', async () => {
    mockGenerateContent.mockResolvedValueOnce({
      response: {
        text: () => 'Invalid response with no brackets'
      }
    });

    await expect(analyzeCode('let x = 5', 'javascript')).rejects.toThrow('No JSON found in AI response');
  });
});

describe('generateFixedCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should clean markdown backticks from fixed code response', async () => {
    mockGenerateContent.mockResolvedValueOnce({
      response: {
        text: () => '```javascript\nconst x = 5;\n```'
      }
    });

    const result = await generateFixedCode('let x = 5', 'javascript');
    expect(result).toBe('const x = 5;');
  });
});
