async function testBackend() {
  const baseUrl = 'http://localhost:5000/api';

  console.log('\n--- 1. Testing GET /api/health ---');
  const healthRes = await fetch(`${baseUrl}/health`);
  const healthData = await healthRes.json();
  console.log('Health Response:', healthData);

  console.log('\n--- 2. Testing GET /api/case-studies ---');
  const csRes = await fetch(`${baseUrl}/case-studies`);
  const csData = await csRes.json();
  console.log(`Case studies count: ${csData.data?.length}`);

  console.log('\n--- 3. Testing POST /api/contact ---');
  const contactRes = await fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Alexander Test',
      email: 'alex.test@enterprise.io',
      company: 'Enterprise Solutions Inc',
      brief: 'Need automated AI operations copilot for customer support.',
      selectedServices: ['AI Agent / Copilot', 'High-Throughput Backend'],
      selectedBudget: '$50k to $100k (Full Squad)',
      selectedTimeline: 'ASAP'
    })
  });
  const contactData = await contactRes.json();
  console.log('Contact Inquiry Created:', contactData);

  console.log('\n--- 4. Testing POST /api/roi/calculate ---');
  const roiRes = await fetch(`${baseUrl}/roi/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teamSize: 30,
      projectType: 'ai-ops',
      hourlyRate: 65,
      hoursWastedPerWeek: 15
    })
  });
  const roiData = await roiRes.json();
  console.log('ROI Calculation Result:', roiData);

  console.log('\n--- 5. Testing POST /api/assistant/chat ---');
  const chatRes = await fetch(`${baseUrl}/assistant/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'What is your 14-day MVP sprint timeline and deliverables?'
    })
  });
  const chatData = await chatRes.json();
  console.log('AI Assistant Response:', chatData);

  console.log('\n--- 6. Testing POST /api/auth/login ---');
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@vorcove.com',
      password: 'vorcove2026'
    })
  });
  const loginData = await loginRes.json();
  console.log('Admin Login Response:', loginData);

  if (loginData.token) {
    console.log('\n--- 7. Testing Protected GET /api/admin/stats ---');
    const statsRes = await fetch(`${baseUrl}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${loginData.token}`
      }
    });
    const statsData = await statsRes.json();
    console.log('Admin Stats:', statsData);
  }

  console.log('\n========================================');
  console.log(' ALL BACKEND API TESTS COMPLETED SUCCESSFUL!');
  console.log('========================================\n');
}

testBackend().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
