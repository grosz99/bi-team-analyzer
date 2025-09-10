import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE',
  dangerouslyAllowBrowser: true
});

export async function analyzeTeam(roles, objectives, skills) {
  const prompt = `
    You are a product development team structure consultant. Analyze this team and provide recommendations based on their SPECIFIC objectives and needs.
    
    Current Team Composition:
    ${roles.map(role => `${role.title} (${role.headcount || 1} people): ${role.description} | Currently: ${role.currentWork}`).join('\n')}
    
    Total Team Size: ${roles.reduce((sum, role) => sum + (role.headcount || 1), 0)} people
    
    Strategic Objectives:
    ${objectives.join('\n')}
    
    Desired Skills/Capabilities:
    ${skills}
    
    IMPORTANT ANALYSIS GUIDELINES:
    1. Notice team imbalances (e.g., many analysts but few engineers, or vice versa)
    2. PRIORITIZE UPSKILLING existing team members over hiring new roles when feasible
    3. If you have many people in one role (like visualization analysts), suggest how to upskill them
    4. Base recommendations on ACTUAL objectives mentioned above
    5. For each recommended role, be VERY SPECIFIC about:
       - What exact features/systems they would build (tie to objectives)
       - What technologies they would use
       - How they complement the existing team
       - Why this can't be done by upskilling current team members
    
    Provide analysis in JSON format:
    {
      "currentGaps": [
        {
          "area": "Skill/capability area directly tied to stated objectives",
          "impact": "High/Medium/Low",
          "description": "What's missing and why it matters FOR THEIR SPECIFIC GOALS"
        }
      ],
      "recommendedRoles": [
        {
          "title": "Specific role title (e.g., Full-Stack Developer, DevOps Engineer, etc.)",
          "description": "Detailed responsibilities: List 3-4 specific tasks this role would handle based on the objectives",
          "reasoning": "Explain EXACTLY how this role addresses the specific objectives mentioned. Reference the objective by name and explain what gap this fills that can't be filled by upskilling",
          "priority": "High/Medium/Low",
          "timeframe": "Immediate/3-6 months/6-12 months",
          "quantity": "Number of people needed in this role"
        }
      ],
      "roleEnhancements": [
        {
          "existingRole": "Current Role Title",
          "numberOfPeople": "How many people in this role could be upskilled",
          "additionalSkills": "Skills to add that align with stated objectives",
          "trainingNeeded": "Specific training recommendations",
          "potentialNewTitle": "What they could become after upskilling"
        }
      ],
      "strategicInsights": [
        "Comment on team balance and composition",
        "Specific upskilling opportunities given your team makeup",
        "Cost-effective ways to achieve objectives with current team"
      ]
    }
    
    Focus heavily on upskilling opportunities, especially if you notice an imbalance in the team. Only recommend new hires when upskilling isn't feasible.
    
    CRITICAL: Your role recommendations must be ACTUAL roles with SPECIFIC responsibilities tied to their objectives. For example:
    - If objective is "Build scalable web application" → Recommend "Full-Stack Developer" with specific tasks like "Build React frontend components, Develop Node.js APIs, Implement authentication system"
    - If objective is "Implement CI/CD pipeline" → Recommend "DevOps Engineer" with tasks like "Set up Jenkins/GitHub Actions, Configure Docker containers, Manage AWS infrastructure"
    
    Never give generic descriptions like "Responsible for building and maintaining the reporting portal" - be specific about WHAT they build and HOW.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a product team structure expert. Return only valid JSON without any markdown formatting or code blocks.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 2000
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}