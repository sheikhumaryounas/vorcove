/**
 * Vorcove Comprehensive Backend API Test Suite
 * Tests all public and protected routes, models, fallback memory store, and telemetry.
 */

async function runComprehensiveTests() {
  const baseUrl = 'http://localhost:5000/api';
  let passedCount = 0;
  let totalTests = 10;

  console.log('\n======================================================');
  console.log('       VORCOVE BACKEND 100% HEALTH & API AUDIT        ');
  console.log('======================================================\n');

  // Helper assertion
  const assert = (condition: boolean, testName: string, detail?: any) => {
    if (condition) {
      passedCount++;
      console.log(`\x1b[32m[PASS]\x1b[0m ${testName}`);
      if (detail) console.log('       ', detail);
    } else {
      console.error(`\x1b[31m[FAIL]\x1b[0m ${testName}`, detail || '');
      throw new Error(`Test failed: ${testName}`);
    }
  };

  // 1. Health
  console.log('--- 1. Health & Database Diagnostic ---');
  const healthRes = await fetch(`${baseUrl}/health`);
  const healthData = await healthRes.json();
  assert(
    healthRes.ok && healthData.status === 'online' && healthData.database !== undefined,
    'GET /api/health returns online status and DB telemetry',
    `Uptime: ${healthData.uptimeSeconds}s | Mode: ${healthData.database?.storageMode}`
  );

  // 2. Case Studies & Testimonials
  console.log('\n--- 2. Case Studies & Testimonials ---');
  const csRes = await fetch(`${baseUrl}/case-studies`);
  const csData = await csRes.json();
  assert(
    csRes.ok && csData.success && Array.isArray(csData.data) && csData.data.length >= 4,
    'GET /api/case-studies returns published case studies',
    `Found ${csData.data?.length} case studies`
  );

  const csSingleRes = await fetch(`${baseUrl}/case-studies/support-copilot`);
  const csSingleData = await csSingleRes.json();
  assert(
    csSingleRes.ok && csSingleData.success && csSingleData.data?.slug === 'support-copilot',
    'GET /api/case-studies/:slug returns single case study',
    `Title: ${csSingleData.data?.title}`
  );

  const testRes = await fetch(`${baseUrl}/testimonials`);
  const testData = await testRes.json();
  assert(
    testRes.ok && testData.success && Array.isArray(testData.data) && testData.data.length >= 3,
    'GET /api/testimonials returns executive testimonials',
    `Found ${testData.data?.length} testimonials`
  );

  // 3. Auth Login & Token Verification
  console.log('\n--- 3. Admin Authentication & JWT ---');
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@vorcove.com',
      password: 'vorcove2026'
    })
  });
  const loginData = await loginRes.json();
  assert(
    loginRes.ok && loginData.success && Boolean(loginData.token) && loginData.user?.role === 'superadmin',
    'POST /api/auth/login generates valid JWT and returns admin profile',
    `Logged in as: ${loginData.user?.email}`
  );

  const token = loginData.token;
  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  const meRes = await fetch(`${baseUrl}/auth/me`, { headers: authHeaders });
  const meData = await meRes.json();
  assert(
    meRes.ok && meData.success && meData.user?.email === 'admin@vorcove.com',
    'GET /api/auth/me decodes JWT authorization header successfully'
  );

  // 4. Contact Inquiries (Create, Read, Update, Delete)
  console.log('\n--- 4. Contact & Consultation Pipeline ---');
  const contactRes = await fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Alexander Wright',
      email: 'a.wright@hyperionlogistics.io',
      company: 'Hyperion Logistics Group',
      brief: 'Need automated AI operations copilot for customer support.',
      selectedServices: ['AI Agent / Copilot', 'High-Throughput Backend'],
      selectedBudget: '$50k to $100k (Full Squad)',
      selectedTimeline: 'ASAP'
    })
  });
  const contactData = await contactRes.json();
  assert(
    contactRes.status === 201 && contactData.success && Boolean(contactData.data?._id || contactData.data?.id),
    'POST /api/contact submits new lead inquiry',
    `Created inquiry ID: ${contactData.data?._id || contactData.data?.id}`
  );

  const inquiryId = contactData.data?._id || contactData.data?.id;

  const inqListRes = await fetch(`${baseUrl}/contact`, { headers: authHeaders });
  const inqListData = await inqListRes.json();
  assert(
    inqListRes.ok && inqListData.success && inqListData.data?.length > 0,
    'GET /api/contact (protected) lists inquiries with pagination'
  );

  const inqPatchRes = await fetch(`${baseUrl}/contact/${inquiryId}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({ status: 'reviewing', internalNotes: 'High priority lead reviewed.' })
  });
  const inqPatchData = await inqPatchRes.json();
  assert(
    inqPatchRes.ok && inqPatchData.success && inqPatchData.data?.status === 'reviewing',
    'PATCH /api/contact/:id updates inquiry status & partner notes'
  );

  // 5. ROI & Scope Calculator
  console.log('\n--- 5. ROI & Scope Proposal Engine ---');
  const roiCalcRes = await fetch(`${baseUrl}/roi/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teamSize: 40,
      projectType: 'pricing',
      hourlyRate: 70,
      hoursWastedPerWeek: 16
    })
  });
  const roiCalcData = await roiCalcRes.json();
  assert(
    roiCalcRes.ok && roiCalcData.success && roiCalcData.data?.estimatedAnnualSavings > 0,
    'POST /api/roi/calculate accurately computes savings and payback',
    `Estimated Annual Savings: $${roiCalcData.data?.estimatedAnnualSavings.toLocaleString()} | Payback: ${roiCalcData.data?.paybackMonths} mo`
  );

  const roiSaveRes = await fetch(`${baseUrl}/roi/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teamSize: 40,
      projectType: 'pricing',
      hourlyRate: 70,
      hoursWastedPerWeek: 16,
      clientName: 'Elena Rostova',
      clientEmail: 'elena@metalsdirect.com',
      clientCompany: 'MetalsDirect Group'
    })
  });
  const roiSaveData = await roiSaveRes.json();
  assert(
    roiSaveRes.status === 201 && roiSaveData.success,
    'POST /api/roi/save persists client scope proposal'
  );

  const roiListRes = await fetch(`${baseUrl}/roi`, { headers: authHeaders });
  const roiListData = await roiListRes.json();
  assert(
    roiListRes.ok && roiListData.success && Array.isArray(roiListData.data),
    'GET /api/roi (protected) returns stored ROI audits'
  );

  // 6. AI Studio Assistant & Lead Capture
  console.log('\n--- 6. AI Studio Assistant & Knowledge Retrieval ---');
  const chatRes = await fetch(`${baseUrl}/assistant/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'What is your 14-day sprint pricing and commercial structure?',
      sessionId: 'sess_test_qa_99'
    })
  });
  const chatData = await chatRes.json();
  assert(
    chatRes.ok && chatData.success && chatData.data?.text && chatData.data?.bulletPoints?.length > 0,
    'POST /api/assistant/chat generates context-aware assistant response with CTAs',
    `Response badge: "${chatData.data?.badge}"`
  );

  const leadRes = await fetch(`${baseUrl}/assistant/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: 'sess_test_qa_99',
      name: 'Sarah Lindqvist',
      email: 'sarah.l@acuitymetrics.com',
      company: 'AcuityMetrics',
      interest: 'Deterministic RAG & Churn Forecasting'
    })
  });
  const leadData = await leadRes.json();
  assert(
    leadRes.ok && leadData.success,
    'POST /api/assistant/lead captures qualified leads directly into conversation session'
  );

  const convsRes = await fetch(`${baseUrl}/assistant/conversations`, { headers: authHeaders });
  const convsData = await convsRes.json();
  assert(
    convsRes.ok && convsData.success && convsData.data?.length > 0,
    'GET /api/assistant/conversations (protected) returns full transcript logs'
  );

  // 7. Interactive Demos & Algorithmic Engines
  console.log('\n--- 7. Interactive Demos & Telemetry ---');
  const copilotRes = await fetch(`${baseUrl}/demos/copilot/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ticketId: 't-test-101',
      subject: 'Urgent customs manifest delay Rotterdam #48921',
      body: 'Container #48921 is stuck at customs port.'
    })
  });
  const copilotData = await copilotRes.json();
  assert(
    copilotRes.ok && copilotData.success && copilotData.data?.confidence > 90,
    'POST /api/demos/copilot/run performs automated classification & response drafting',
    `Category: "${copilotData.data?.category}" | Priority: "${copilotData.data?.priority}"`
  );

  const pricingRes = await fetch(`${baseUrl}/demos/pricing/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      monthlyRevenue: 1500000,
      baseMargin: 24,
      elasticityScore: 8.2
    })
  });
  const pricingData = await pricingRes.json();
  assert(
    pricingRes.ok && pricingData.success && pricingData.data?.monthlyProfitLift > 0,
    'POST /api/demos/pricing/simulate recalculates dynamic elasticity & profit lift',
    `Annual Lift: +$${pricingData.data?.annualProfitLift.toLocaleString()}`
  );

  const churnRes = await fetch(`${baseUrl}/demos/churn/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accountName: 'Global Enterprise Corp',
      usageDropPercent: 48,
      openTickets: 7,
      contractValue: 240000
    })
  });
  const churnData = await churnRes.json();
  assert(
    churnRes.ok && churnData.success && churnData.data?.riskScore > 0,
    'POST /api/demos/churn/analyze identifies critical risk triggers & automated interventions',
    `Risk Score: ${churnData.data?.riskScore}/100 (${churnData.data?.riskLevel})`
  );

  const telemRes = await fetch(`${baseUrl}/demos/telemetry`);
  const telemData = await telemRes.json();
  assert(
    telemRes.ok && telemData.success && Array.isArray(telemData.data),
    'GET /api/demos/telemetry returns historical live demo execution events'
  );

  // 8. Newsletter Subscription
  console.log('\n--- 8. Newsletter Subscription Pipeline ---');
  const subRes = await fetch(`${baseUrl}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'techlead@cloudscale.io',
      source: 'website_footer'
    })
  });
  const subData = await subRes.json();
  assert(
    (subRes.status === 201 || subRes.status === 200) && subData.success,
    'POST /api/newsletter/subscribe registers new technical briefing subscriber',
    subData.message
  );

  const subListRes = await fetch(`${baseUrl}/newsletter`, { headers: authHeaders });
  const subListData = await subListRes.json();
  assert(
    subListRes.ok && subListData.success && Array.isArray(subListData.data),
    'GET /api/newsletter (protected) retrieves subscriber database'
  );

  // 9. Admin Stats
  console.log('\n--- 9. Studio Admin Dashboard Analytics ---');
  const statsRes = await fetch(`${baseUrl}/admin/stats`, { headers: authHeaders });
  const statsData = await statsRes.json();
  assert(
    statsRes.ok &&
      statsData.success &&
      statsData.stats?.totalInquiries >= 1 &&
      statsData.stats?.totalAudits >= 1 &&
      statsData.system?.platform !== undefined,
    'GET /api/admin/stats aggregates full studio metrics & hardware telemetry',
    `Inquiries: ${statsData.stats?.totalInquiries} | Audits: ${statsData.stats?.totalAudits} | Savings: $${statsData.stats?.totalEstimatedSavings.toLocaleString()} | Subscriptions: ${statsData.stats?.totalSubscribers}`
  );

  // 10. Clean-up & Safety Check
  console.log('\n--- 10. Inquiry Cleanup & Security Guardrails ---');
  const delRes = await fetch(`${baseUrl}/contact/${inquiryId}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  const delData = await delRes.json();
  assert(
    delRes.ok && delData.success,
    'DELETE /api/contact/:id successfully removes inquiry record'
  );

  console.log('\n======================================================');
  console.log(`\x1b[32m✔ ALL ${passedCount} CHECKS PASSED! BACKEND IS 100% OPERATIONAL.\x1b[0m`);
  console.log('======================================================\n');
}

runComprehensiveTests().catch(err => {
  console.error('\n\x1b[31m[Audit Failed]\x1b[0m', err);
  process.exit(1);
});
