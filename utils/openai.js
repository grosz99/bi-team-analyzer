import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
  dangerouslyAllowBrowser: true
});

export async function analyzeTeam(roles, objectives, skills) {
  const systemPrompt = `You are a product development team structure consultant. 
Your job is to evaluate the team's current composition, objectives, and desired skills, and return practical recommendations.

STRICT OUTPUT FORMAT:
Return ONLY valid JSON with the following structure:
{
  "currentGaps": [
    {
      "area": "Specific skill/capability gap",
      "impact": "High/Medium/Low",
      "description": "Why this gap matters for their objectives",
      "tiedToObjective": "Which specific objective this affects"
    }
  ],
  "recommendedRoles": [
    {
      "title": "Specific role title (e.g., Full-Stack Developer, DevOps Engineer)",
      "description": "3-4 specific responsibilities this role would handle",
      "technologies": ["Tech1", "Tech2", "Tech3"],
      "reasoning": "Why hire this role vs upskilling existing team",
      "priority": "High/Medium/Low",
      "timeframe": "Immediate/3-6 months/6-12 months",
      "quantity": 1,
      "tiedToObjective": "Which specific objective this addresses"
    }
  ],
  "roleEnhancements": [
    {
      "existingRole": "Current Role Title",
      "numberOfPeople": 2,
      "additionalSkills": ["Skill1", "Skill2"],
      "trainingNeeded": "Specific training path",
      "potentialNewTitle": "What they could become",
      "feasibility": "High/Medium/Low",
      "justification": "Why this upskilling makes sense given their current skills"
    }
  ],
  "strategicInsights": [
    "Insight about team balance",
    "Cost-effective approach to achieve objectives",
    "Timeline considerations"
  ]
}

CRITICAL ANALYSIS RULES:
1. Notice team imbalances (too many of one role, missing key roles)
2. Only suggest upskilling where skills naturally align (e.g., Data Viz → Frontend is realistic, Data Engineer → UX Designer is not)
3. If objectives require fundamentally different expertise, recommend hiring
4. Tie EVERY recommendation back to a specific stated objective
5. Be specific about technologies and responsibilities - no generic descriptions
6. If no new roles needed, return empty recommendedRoles array and explain in insights
7. Always consider at least one realistic upskilling opportunity if possible`;

  const userPrompt = `
Current Team Composition:
${roles.map(role => `${role.title} (${role.headcount || 1} people): ${role.description} | Currently: ${role.currentWork}`).join('\n')}

Total Team Size: ${roles.reduce((sum, role) => sum + (role.headcount || 1), 0)} people

Strategic Objectives:
${objectives.join('\n')}

Desired Skills/Capabilities:
${skills}

Analyze this team and provide recommendations. Be practical - suggest hiring for fundamentally different skills, upskilling only where there's natural overlap.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userPrompt
      }
    ],
    temperature: 0.3,
    max_tokens: 3000,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}