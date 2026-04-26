
// US State list
export const usStates = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Puerto Rico', abbreviation: 'PR' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' }
];

// Project status options
export const statusOptions = [
  { label: 'ACTIVE LIGHT', value: 'ACTIVE LIGHT' },
  { label: 'ACTIVE MEDIUM', value: 'ACTIVE MEDIUM' },
  { label: 'ACTIVE HEAVY', value: 'ACTIVE HEAVY' },
  { label: 'ON HOLD', value: 'ON HOLD' },
  { label: 'IN CONSTRUCTION', value: 'IN CONSTRUCTION' },
  { label: 'BIDDING', value: 'BIDDING' },
  { label: 'COMPLETED', value: 'COMPLETED' }
];

// The different types of projects
export const projectTypes = [
  { label: 'DESIGN', value: 'DESIGN' },
  { label: 'REPORT', value: 'REPORT' },
  { label: 'QA/QC', value: 'QA/QC REVIEW' },
  { label: 'CONSTRUCTION', value: 'CONSTRUCTION' }
];

// The different work Scopes (trades)
export const scopeTrades = [
  { label: 'Architecture', value: 'ARCH' },
  { label: 'Civil', value: 'CIVIL' },
  { label: 'Electrical', value: 'ELEC' },
  { label: 'Fire Protection', value: 'FP' },
  { label: 'HVAC', value: 'HVAC' },
  { label: 'Plumbing', value: 'PLBG' },
  { label: 'Process Mechanical', value: 'P-MECH' },
  { label: 'Structural', value: 'STRL' },
];

// Is GEC Allowed on the project?
export const gecAllowed = [
  { label: 'YES', value: 'YES' },
  { label: 'NO', value: 'NO' }
];

// This will be changed to a function that fetches all lead enginers from the database based on who the team lead is, but for now it's hardcoded for testing purposes
export const leadEngineers = [
  { name: 'John Doe', email: 'john.doe@company.com' },
  { name: 'Jane Smith', email: 'jane.smith@company.com' },
  { name: 'Bob Johnson', email: 'bob.johnson@company.com' }
];

export const assistEngineers = [
  { name: 'John Doe', email: 'john.doe@company.com' },
  { name: 'Jane Smith', email: 'jane.smith@company.com' },
  { name: 'Bob Johnson', email: 'bob.johnson@company.com' }
];


export const truncateText = (text, limit) => {
  if (!text) return '-';
  return text.length > limit ? text.substring(0, limit) + '...' : text;
};


// Close Select when clicking outside
export const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};