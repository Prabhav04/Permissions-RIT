export const templates = [
  {
    id: 'sopanam-hall',
    name: 'Sopanam Hall',
    description: 'Request to use Sopanam Hall',
    subject: 'Request for the usage of Sopanam Hall',
    content: `
      <p><strong>To,</strong></p>
      <p>The Principal,</p>
      <p>Rajiv Gandhi Institute of Technology,</p>
      <p>Kottayam.</p>
      <br/>
      <p><strong>Subject: Request for the usage of Sopanam Hall</strong></p>
      <br/>
      <p>Respected Sir/Madam,</p>
      <p>I am writing to request permission to use Sopanam Hall for [Purpose].</p>
      <p>I kindly request you to grant me permission to use Sopanam Hall om  [Date] from [Time] to [Time] for [Purpose].</p>
      <br/>
      <p>Thanking You,</p>
      <p>Yours Faithfully,</p>
      <br/>
      <p>[Your Name]</p>
      <p>[Roll Number]</p>
      <p>[Department]</p>
    `
  },
  {
    id: 'college-auditorium',
    name: 'College Auditorium',
    description: 'Request to use College Auditorium',
    subject: 'Request for the usage of College Auditorium',
    content: `
      <p><strong>To,</strong></p>
      <p>The Principal,</p>
      <p>Rajiv Gandhi Institute of Technology,</p>
      <p>Kottayam.</p>
      <br/>
      <p><strong>Subject: Request for the usage of College Auditorium</strong></p>
      <br/>
      <p>Respected Sir/Madam,</p>
      <p>I am writing to request permission to use College Auditorium for [Purpose].</p>
      <p>I kindly request you to grant me permission to use College Auditorium om  [Date] from [Time] to [Time] for [Purpose].</p>
      <br/>
      <p>Thanking You,</p>
      <p>Yours Faithfully,</p>
      <br/>
      <p>[Your Name]</p>
      <p>[Roll Number]</p>
      <p>[Department]</p>
    `
  },
  {
    id: 'seminar-hall',
    name: 'Seminar Hall',
    description: 'Request to use Seminar Hall',
    subject: 'Request for the usage of Seminar Hall',
    content: `
      <p><strong>To,</strong></p>
      <p>The HoD [Department],</p>
      <p>Rajiv Gandhi Institute of Technology,</p>
      <p>Kottayam.</p>
      <br/>
      <p><strong>Subject: Request for the usage of Seminar Hall</strong></p>
      <br/>
      <p>Respected Sir/Madam,</p>
      <p>I am writing to request permission to use Seminar Hall for [Purpose].</p>
      <p>I kindly request you to grant me permission to use Seminar Hall om  [Date] from [Time] to [Time] for [Purpose].</p>
      <br/>
      <p>Thanking You,</p>
      <p>Yours Faithfully,</p>
      <br/>
      <p>[Your Name]</p>
      <p>[Roll Number]</p>
      <p>[Department]</p>
    `
  },
  {
    id: 'department-hourextensions',
    name: 'Department Hour Extensions ',
    description: 'Permission for extension of department hours',
    subject: 'Request for Permission for Extension of Department Hours',
    content: `
      <p><strong>To,</strong></p>
      <p>The Principal,</p>
      <p>Rajiv Gandhi Institute of Technology,</p>
      <p>Kottayam.</p>
      <br/>
      <p><strong>Subject: Request for Permission for Extension of Department Hours</strong></p>
      <br/>
      <p>Respected Sir/Madam,</p>
      <p>I am writing to request permission to extend the department hours for [Purpose].</p>
      <p>I kindly request you to grant me permission to extend the department hours om  [Date] from [Time] to [Time].</p>
      <p>Thanking You,</p>
      <p>Yours Faithfully,</p>
      <br/>
      <br/>
      <p>[Representative Name]</p>
      <p>[Class Representative]</p>
    `
  },
  {
    id: 'industrial-visit',
    name: 'Industrial Visit',
    description: 'Permission for class industrial visit',
    subject: 'Request for Permission for Industrial Visit',
    content: `
      <p><strong>To,</strong></p>
      <p>The Principal,</p>
      <p>Rajiv Gandhi Institute of Technology,</p>
      <p>Kottayam.</p>
      <br/>
      <p><strong>Subject: Request for Permission for Industrial Visit</strong></p>
      <br/>
      <p>Respected Sir/Madam,</p>
      <p>I am writing on behalf of the students of [Semester/Batch] [Department]. We are planning an industrial visit to [Company Name, Location] on [Date]. This visit is intended to bridge the gap between theoretical knowledge and practical application.</p>
      <p>We have received confirmation from the company for the visit. We request you to kindly grant us permission to conduct this industrial visit.</p>
      <br/>
      <p>Thanking You,</p>
      <p>Yours Faithfully,</p>
      <br/>
      <p>[Representative Name]</p>
      <p>[Class Representative]</p>
    `
  },
  {
    id: 'duty-leave',
    name: 'Duty Leave (Event)',
    description: 'Request duty leave for event participation',
    subject: 'Request for Duty Leave',
    content: `
      <p><strong>To,</strong></p>
      <p>The Principal,</p>
      <p>Rajiv Gandhi Institute of Technology,</p>
      <p>Kottayam.</p>
      <br/>
      <p><strong>Subject: Request for Duty Leave</strong></p>
      <br/>
      <p>Respected Sir/Madam,</p>
      <p>I am writing to request duty leave for [Date(s)] as I will be participating in [Event Name] at [Venue/College]. This event is a great opportunity for me to showcase my skills and represent our college.</p>
      <p>I assure you that I will catch up on any missed lessons. Kindly grant me duty leave for the above-mentioned dates.</p>
      <br/>
      <p>Thanking You,</p>
      <p>Yours Faithfully,</p>
      <br/>
      <p>[Your Name]</p>
      <p>[Roll Number]</p>
    `
  },
  {
    id: 'general',
    name: 'General Permission',
    description: 'Blank template for general requests',
    subject: 'Request for Permission',
    content: `
      <p><strong>To,</strong></p>
      <p>The Principal,</p>
      <p>Rajiv Gandhi Institute of Technology,</p>
      <p>Kottayam.</p>
      <br/>
      <p><strong>Subject: Request for Permission for [Reason]</strong></p>
      <br/>
      <p>Respected Sir/Madam,</p>
      <p>I am writing to request permission for [state the reason clearly].</p>
      <p>[Provide any additional details or context needed for the request].</p>
      <p>I kindly request you to consider my application and grant permission.</p>
      <br/>
      <p>Thanking You,</p>
      <p>Yours Faithfully,</p>
      <br/>
      <p>[Your Name]</p>
      <p>[Roll Number]</p>
    `
  }
];
