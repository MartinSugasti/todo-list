const defaultProjects = [
  {
    title: 'January',
    sort: 'priority',
    collapse: false,
    tasks: [
      {
        description: 'Meeting with accountant',
        date: '2022-01-07',
        priority: 3,
        status: true
      },
      {
        description: 'Rent car for Pirineos trip',
        date: '2022-02-20',
        priority: 5,
        status: false
      },
      {
        description: 'Get info about skiing',
        date: '',
        priority: 5,
        status: true
      }
    ]
  },
  {
    title: 'USA Trip',
    sort: 'date',
    collapse: false,
    tasks: [
      {
        description: 'Yosemite booking',
        date: '',
        priority: 3,
        status: false
      },
      {
        description: 'SF booking',
        date: '',
        priority: 3,
        status: false
      },
      {
        description: 'Flights',
        date: '2022-06-04',
        priority: 5,
        status: true
      }
    ]
  },
  {
    title: 'Norway Trip',
    sort: 'description',
    collapse: false,
    tasks: [
      {
        description: 'Buy tickets',
        date: '',
        priority: 5,
        status: false
      },
      {
        description: 'When to see the aurora?',
        date: '',
        priority: 3,
        status: false
      },
      {
        description: 'Where to see the aurora?',
        date: '',
        priority: 3,
        status: false
      }
    ]
  },
  {
    title: 'Home stuff',
    sort: 'priority',
    collapse: false,
    tasks: [
      {
        description: 'Buy toaster',
        date: '',
        priority: 3,
        status: false
      },
      {
        description: 'Check electricity consumption',
        date: '',
        priority: 5,
        status: false
      }
    ]
  },
]


export default defaultProjects;
