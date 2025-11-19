import { useState, useEffect, useRef, useContext, createContext } from "react";
import { createPortal } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";

const donationRows = [
  {
    id: "DN1042",
    date: "14/02/2025",
    amount: "₹3,500",
    mode: "UPI",
    utr: "UTR178345",
    scheme: "Donate a Brick",
    schemeEligible: true,
    status: "success",
  },
  {
    id: "DN1041",
    date: "05/02/2025",
    amount: "₹1,200",
    mode: "Card",
    utr: "UTR163210",
    scheme: "Tulsi Seva",
    schemeEligible: false,
    status: "pending",
  },
  {
    id: "DN1040",
    date: "28/01/2025",
    amount: "₹2,700",
    mode: "Net Banking",
    utr: "UTR158902",
    scheme: "Ekadashi Sankalpa",
    schemeEligible: true,
    status: "success",
  },
  {
    id: "DN1039",
    date: "15/01/2025",
    amount: "₹900",
    mode: "UPI",
    utr: "UTR153487",
    scheme: "Annadaan",
    schemeEligible: true,
    status: "failed",
  },
  {
    id: "DN1038",
    date: "02/01/2025",
    amount: "₹5,000",
    mode: "Card",
    utr: "UTR148322",
    scheme: "Go Seva",
    schemeEligible: false,
    status: "success",
  },
  {
    id: "DN1037",
    date: "24/12/2024",
    amount: "₹3,200",
    mode: "UPI",
    utr: "UTR141278",
    scheme: "Festival Seva",
    schemeEligible: true,
    status: "success",
  },
  {
    id: "DN1036",
    date: "12/12/2024",
    amount: "₹1,800",
    mode: "Net Banking",
    utr: "UTR133654",
    scheme: "Tulsi Seva",
    schemeEligible: false,
    status: "pending",
  },
  {
    id: "DN1035",
    date: "30/11/2024",
    amount: "₹2,200",
    mode: "UPI",
    utr: "UTR126788",
    scheme: "Ekadashi Sankalpa",
    schemeEligible: true,
    status: "success",
  },
  {
    id: "DN1034",
    date: "18/11/2024",
    amount: "₹750",
    mode: "Cash",
    utr: "NA",
    scheme: "Annadaan",
    schemeEligible: true,
    status: "success",
  },
  {
    id: "DN1033",
    date: "05/11/2024",
    amount: "₹1,500",
    mode: "UPI",
    utr: "UTR118530",
    scheme: "Go Seva",
    schemeEligible: false,
    status: "failed",
  },
];

const form10beRows = [
  {
    year: "2024-25",
    total: 42000,
    available: true,
    downloadUrl: "#10be-2024-25",
  },
  {
    year: "2023-24",
    total: 31850,
    available: true,
    downloadUrl: "#10be-2023-24",
  },
  {
    year: "2022-23",
    total: 15800,
    available: false,
    downloadUrl: "",
  },
];
const requestRows = [
  {
    id: "REQ0012",
    type: "Missing Donation",
    requestedOn: "14 Feb 2025",
    donationId: "DN1042",
    status: "completed",
    source: "USER",
    details: {
      date: "12/02/2025",
      amount: "₹3,500",
      mode: "UPI",
      handle: "abhishek@axisbank",
      screenshot: "receipt-feb12.png",
      notes: "UPI payment during Vasant Panchami drive.",
    },
  },
  {
    id: "REQ0011",
    type: "Missing Donation",
    requestedOn: "02 Feb 2025",
    donationId: "Pending",
    status: "pending",
    source: "USER",
    details: {
      date: "30/01/2025",
      amount: "₹1,800",
      mode: "Net Banking",
      handle: "HDFC Bank",
      screenshot: "",
      notes: "IMPS reference AXI908765; please confirm mapping.",
    },
  },
  {
    id: "REQ0010",
    type: "Missing Donation",
    requestedOn: "18 Jan 2025",
    donationId: "DN1037",
    status: "completed",
    source: "USER",
    details: {
      date: "15/01/2025",
      amount: "₹3,200",
      mode: "UPI",
      handle: "donor@oksbi",
      screenshot: "upi-proof-jan15.png",
      notes: "Submitted during Sankalpa seva.",
    },
  },
  {
    id: "REQ0009",
    type: "Missing Donation",
    requestedOn: "05 Jan 2025",
    donationId: "Pending",
    status: "pending",
    source: "USER",
    details: {
      date: "01/01/2025",
      amount: "₹900",
      mode: "Cash",
      handle: "N/A",
      screenshot: "",
      notes: "Submitted cash during temple visit.",
    },
  },
  {
    id: "REQ0008",
    type: "Missing Donation",
    requestedOn: "28 Dec 2024",
    donationId: "Pending",
    status: "rejected",
    source: "ADMIN_BULK_UPLOAD",
    comment:
      "We could not locate any donation with the UTR provided. Please confirm the reference details and resubmit.",
    details: {
      date: "26/12/2024",
      amount: "₹1,400",
      mode: "Net Banking",
      handle: "SBI Bank",
      screenshot: "",
      notes: "Festival seva transfer.",
    },
  },
];

const allRequestsData = [
  {
    id: "RQ0047",
    type: "Missing Donation",
    requestedOn: "2025-02-15",
    donationId: "DN1042",
    status: "pending",
    source: "USER",
    donorName: "Aarav Patel",
    phone: "+91 98765 43210",
    email: "aarav.patel@example.com",
    utr: "UTR178345",
    amount: "₹3,500",
    comment: "",
    details: {
      transactionDate: "12/02/2025",
      mode: "UPI",
      handle: "abhishek@axisbank",
      screenshot: "receipt-feb12.png",
      notes: "UPI payment during Vasant Panchami drive.",
    },
    probableMatches: [
      {
        id: "BM-1201",
        date: "12/02/2025",
        amount: "₹3,500",
        mode: "UPI",
        utr: "UTR178345",
        confidence: 95,
        donationId: "DN1042",
      },
      {
        id: "BM-1199",
        date: "11/02/2025",
        amount: "₹3,450",
        mode: "UPI",
        utr: "UTR178100",
        confidence: 78,
      },
    ],
  },
  {
    id: "RQ0046",
    type: "Missing Donation",
    requestedOn: "2025-02-10",
    donationId: null,
    status: "pending",
    source: "ADMIN_BULK_UPLOAD",
    donorName: "Meera Iyer",
    phone: "+91 99887 76655",
    email: "meera.iyer@example.com",
    utr: "HDFCNEFT23451",
    amount: "₹2,100",
    comment: "",
    details: {
      transactionDate: "09/02/2025",
      mode: "Net Banking",
      handle: "HDFC Bank",
      screenshot: "neft-proof.pdf",
      notes: "Donation during temple annadaan seva.",
    },
    probableMatches: [
      {
        id: "BM-1188",
        date: "09/02/2025",
        amount: "₹2,100",
        mode: "Net Banking",
        utr: "HDFCNEFT23451",
        confidence: 88,
        donationId: "DN1088",
      },
    ],
  },
  {
    id: "RQ0045",
    type: "Missing Donation",
    requestedOn: "2025-02-02",
    donationId: "DN1037",
    status: "approved",
    source: "USER",
    donorName: "Rohit Sharma",
    phone: "+91 90909 80807",
    email: "rohit.sharma@example.com",
    utr: "UPI209811",
    amount: "₹3,200",
    comment: "Verified with HDFC statement",
    details: {
      transactionDate: "30/01/2025",
      mode: "UPI",
      handle: "donor@oksbi",
      screenshot: "upi-proof-jan.png",
      notes: "Festival seva contribution.",
    },
    probableMatches: [
      {
        id: "BM-1102",
        date: "30/01/2025",
        amount: "₹3,200",
        mode: "UPI",
        utr: "UPI209811",
        confidence: 91,
        donationId: "DN1037",
      },
    ],
  },
  {
    id: "RQ0044",
    type: "Missing Donation",
    requestedOn: "2025-01-18",
    donationId: null,
    status: "rejected",
    source: "ADMIN_BULK_UPLOAD",
    donorName: "Saanvi Rao",
    phone: "+91 91234 56780",
    email: "saanvi.rao@example.com",
    utr: "AXISIMPS56789",
    amount: "₹1,000",
    comment: "UTR did not match any entry in the bank log.",
    details: {
      transactionDate: "15/01/2025",
      mode: "IMPS",
      handle: "Axis Bank",
      screenshot: "",
      notes: "Submitted during outreach program.",
    },
    probableMatches: [],
  },
  {
    id: "RQ0043",
    type: "Missing Donation",
    requestedOn: "2025-01-05",
    donationId: "DN1033",
    status: "approved",
    source: "USER",
    donorName: "Dev Khanna",
    phone: "+91 90123 45670",
    email: "dev.khanna@example.com",
    utr: "ICICIRT8765",
    amount: "₹6,900",
    comment: "Mapped during Jan campaign reconciliation",
    details: {
      transactionDate: "02/01/2025",
      mode: "Net Banking",
      handle: "ICICI Bank",
      screenshot: "icici-receipt.pdf",
      notes: "Corporate seva contribution.",
    },
    probableMatches: [
      {
        id: "BM-1044",
        date: "02/01/2025",
        amount: "₹6,900",
        mode: "Net Banking",
        utr: "ICICIRT8765",
        confidence: 97,
        donationId: "DN1033",
      },
    ],
  },
];

const fundraisingRows = [
  {
    name: "Aarav Patel",
    date: "15/02/2025",
    amount: "₹2,000",
    mode: "UPI",
    utr: "UTR908123",
  },
  {
    name: "Meera Iyer",
    date: "09/02/2025",
    amount: "₹1,500",
    mode: "Card",
    utr: "UTR904512",
  },
  {
    name: "Rohit Sharma",
    date: "02/02/2025",
    amount: "₹3,200",
    mode: "Net Banking",
    utr: "UTR899456",
  },
  {
    name: "Saanvi Rao",
    date: "25/01/2025",
    amount: "₹1,000",
    mode: "UPI",
    utr: "UTR885321",
  },
  {
    name: "Dev Khanna",
    date: "10/01/2025",
    amount: "₹4,500",
    mode: "Card",
    utr: "UTR873210",
  },
  {
    name: "Ishita Menon",
    date: "28/12/2024",
    amount: "₹850",
    mode: "Cash",
    utr: "NA",
  },
  {
    name: "Kabir Bose",
    date: "16/12/2024",
    amount: "₹2,750",
    mode: "UPI",
    utr: "UTR843119",
  },
  {
    name: "Nidhi Kapoor",
    date: "04/12/2024",
    amount: "₹1,900",
    mode: "Net Banking",
    utr: "UTR832004",
  },
  {
    name: "Vikram Joshi",
    date: "22/11/2024",
    amount: "₹3,000",
    mode: "UPI",
    utr: "UTR818765",
  },
  {
    name: "Ananya Desai",
    date: "11/11/2024",
    amount: "₹1,600",
    mode: "Card",
    utr: "UTR809654",
  },
];

const donationListRows = [
  {
    id: "DN1201",
    date: "2025-02-15",
    donor: "Aarav Menon",
    amount: 3500,
    mode: "UPI",
    utr: "UTR9088123",
    status: "success",
    isMapped: true,
  },
  {
    id: "DN1198",
    date: "2025-02-10",
    donor: "Saanvi Iyer",
    amount: 2100,
    mode: "Card",
    utr: "TRX1209811",
    status: "pending",
    isMapped: false,
  },
  {
    id: "DN1184",
    date: "2025-01-28",
    donor: "Rohit Bhandari",
    amount: 4800,
    mode: "Net Banking",
    utr: "HDFCNEFT23451",
    status: "success",
    isMapped: true,
  },
  {
    id: "DN1172",
    date: "2025-01-05",
    donor: "Meera Kapur",
    amount: 950,
    mode: "UPI",
    utr: "UPI209811",
    status: "failed",
    isMapped: false,
  },
  {
    id: "DN1160",
    date: "2024-12-19",
    donor: "Kabir Shah",
    amount: 5200,
    mode: "Card",
    utr: "VISA543211",
    status: "success",
    isMapped: true,
  },
  {
    id: "DN1154",
    date: "2024-12-01",
    donor: "Ishita Nair",
    amount: 1300,
    mode: "Cash",
    utr: "NA",
    status: "success",
    isMapped: true,
  },
  {
    id: "DN1148",
    date: "2024-11-20",
    donor: "Dev Khanna",
    amount: 6900,
    mode: "Net Banking",
    utr: "ICICIRT8765",
    status: "success",
    isMapped: false,
  },
  {
    id: "DN1135",
    date: "2024-11-05",
    donor: "Lavanya Sharma",
    amount: 1750,
    mode: "UPI",
    utr: "UTR771245",
    status: "pending",
    isMapped: false,
  },
  {
    id: "DN1120",
    date: "2024-10-18",
    donor: "Pranav Rao",
    amount: 2500,
    mode: "Card",
    utr: "TRX667120",
    status: "success",
    isMapped: true,
  },
  {
    id: "DN1112",
    date: "2024-10-05",
    donor: "Nisha Patil",
    amount: 3200,
    mode: "UPI",
    utr: "UPI778940",
    status: "failed",
    isMapped: false,
  },
];

const parseDateInput = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "number") return new Date(value);
  if (typeof value === "string" && value.includes("/")) {
    const [day, month, year] = value.split("/");
    if (day && month && year) {
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getDateOnly = (value) => {
  const date = parseDateInput(value);
  if (!date) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const formatDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseAmountValue = (value) => {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const numeric = String(value).replace(/[^0-9.]/g, "");
  return Number(numeric) || 0;
};

const FINANCIAL_YEAR_OPTIONS = getFinancialYearOptions(5);

function getFinancialYearOptions(count = 5) {
  const today = new Date();
  const currentStartYear = today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
  return Array.from({ length: count }, (_, index) => {
    const startYear = currentStartYear - index;
    const endYear = startYear + 1;
    return {
      label: `${startYear}-${String(endYear).slice(-2)}`,
      startDate: `${startYear}-04-01`,
      endDate: `${endYear}-03-31`,
    };
  });
}

function MappingChip({ mapped }) {
  return (
    <span className={`mapping-chip ${mapped ? "mapped" : "not-mapped"}`}>
      {mapped && (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="m4 8 2.6 2.6L12 5.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {mapped ? "Mapped" : "Not Mapped"}
    </span>
  );
}

function FinancialYearDropdown({ selectedYear, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const label = selectedYear ? `FY ${selectedYear}` : "Financial Year";

  return (
    <div className="fy-selector" ref={ref}>
      <button
        type="button"
        className={`fy-chip${selectedYear ? " active" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
        <span className={`fy-chevron${open ? " open" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path d="m5 6 3 3 3-3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="fy-dropdown">
          {FINANCIAL_YEAR_OPTIONS.map((option) => (
            <button
              type="button"
              key={option.label}
              className={`fy-option${selectedYear === option.label ? " selected" : ""}`}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const DONATION_LIST_PATH = "/donation-list-view";
const BULK_UPLOAD_PATH = "/bulk-upload";
const BANK_UPLOAD_PATH = "/upload-bank-statements";
const ALL_REQUESTS_PATH = "/all-requests";
const BANK_STATEMENTS_PATH = "/bank-statements";

const USER_NAV = [
  { label: "Overview", path: "/overview" },
  { label: "My Donation Seva", path: "/donations" },
  { label: "My Fundraising Seva", path: "/fundraising" },
  { label: "My Profile", path: "/profile" },
  { label: "Report a Missing Donation", path: "/report-missing" },
  { label: "My Requests", path: "/requests" },
  { label: "Form 10BE", path: "/form-10be" },
];

const ADMIN_NAV = [
  { label: "Donation List View", path: DONATION_LIST_PATH },
  { label: "Receipt Requests", path: BULK_UPLOAD_PATH },
  { label: "Upload Bank Statements", path: BANK_UPLOAD_PATH },
  { label: "Bank Statement View", path: BANK_STATEMENTS_PATH },
  { label: "All Requests", path: ALL_REQUESTS_PATH },
];

const UserContext = createContext();

const useUser = () => useContext(UserContext);

function DashboardNav({ currentPath }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [userOpen, setUserOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(true);

  const renderSection = (title, items, open, toggle) => (
    <div className="nav-section">
      <button type="button" className={`nav-section-header${open ? " expanded" : ""}`} onClick={toggle}>
        <span>{title}</span>
        <svg viewBox="0 0 24 24" className={`chevron${open ? " open" : ""}`}>
          <path d="M6 9l6 6 6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={`nav-items${open ? " open" : ""}`}>
        {items.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              type="button"
              className={`nav-item${isActive ? " active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-accent" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className="dashboard-nav">
      {renderSection("User Profile", USER_NAV, userOpen, () => setUserOpen((prev) => !prev))}
      {user?.isAdmin &&
        renderSection("Admin Profile", ADMIN_NAV, adminOpen, () => setAdminOpen((prev) => !prev))}
    </aside>
  );
}


function AllRequests() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [requestsData, setRequestsData] = useState(allRequestsData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quickRange, setQuickRange] = useState("");
  const [selectedFY, setSelectedFY] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [detailRequest, setDetailRequest] = useState(null);
  const [rejectModal, setRejectModal] = useState({
    open: false,
    request: null,
    reason: "",
    error: "",
  });
  const [highlight, setHighlight] = useState(null);
  const [matchModalRequest, setMatchModalRequest] = useState(null);
  const [filterOpen, setFilterOpen] = useColumnFilterState();
  const requestFilterDefaults = {
    requestId: "",
    requestType: "all",
    source: "all",
    requestedFrom: "",
    requestedTo: "",
    donationId: "",
    status: "all",
  };
  const [columnFilters, setColumnFilters] = useState(requestFilterDefaults);
  const [columnDatePreset, setColumnDatePreset] = useState("");

  const syncRequestDates = (startValue, endValue) => {
    setStartDate(startValue);
    setEndDate(endValue);
    setColumnFilters((prev) => ({
      ...prev,
      requestedFrom: startValue,
      requestedTo: endValue,
    }));
  };

  const handleStartDateChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setStartDate(value);
    setColumnFilters((prev) => ({ ...prev, requestedFrom: value }));
  };

  const handleEndDateChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setEndDate(value);
    setColumnFilters((prev) => ({ ...prev, requestedTo: value }));
  };

  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const setRange = (range) => {
    setQuickRange(range);
    setSelectedFY("");
    const today = new Date();
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let start = new Date(end);
    if (range === "thisMonth") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (range === "last3Months") {
      start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    }
    const startValue = start.toISOString().split("T")[0];
    const endValue = end.toISOString().split("T")[0];
    syncRequestDates(startValue, endValue);
    setColumnDatePreset("");
  };

  const updateColumnFilter = (key, value) => {
    setColumnFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "requestedFrom" || key === "requestedTo") {
      setColumnDatePreset("");
    }
  };

  const resetColumnFilter = (...keys) => {
    setColumnFilters((prev) => {
      const next = { ...prev };
      keys.forEach((key) => {
        next[key] = requestFilterDefaults[key];
      });
      return next;
    });
    if (keys.includes("requestedFrom") || keys.includes("requestedTo")) {
      setColumnDatePreset("");
    }
  };

  const setRequestedQuickRange = (range) => {
    setColumnDatePreset(range);
    const today = new Date();
    let start = new Date(today);
    let end = new Date(today);
    if (range === "last7") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    } else if (range === "last30") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
    }
    setColumnFilters((prev) => ({
      ...prev,
      requestedFrom: formatDateInputValue(start),
      requestedTo: formatDateInputValue(end),
    }));
  };

  const handleFinancialYearSelect = (option) => {
    setSelectedFY(option.label);
    setQuickRange("");
    setColumnDatePreset("");
    syncRequestDates(option.startDate, option.endDate);
  };

  const filteredRequests = requestsData
    .filter((request) => {
      const requestDate = getDateOnly(request.requestedOn);
      if (startDate) {
        const startBoundary = getDateOnly(startDate);
        if (startBoundary && requestDate && requestDate < startBoundary) return false;
      }
      if (endDate) {
        const endBoundary = getDateOnly(endDate);
        if (endBoundary && requestDate && requestDate > endBoundary) return false;
      }
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return (
        request.id.toLowerCase().includes(term) ||
        (request.donationId || "pending mapping").toLowerCase().includes(term) ||
        (request.donorName || "").toLowerCase().includes(term) ||
        (request.phone || "").toLowerCase().includes(term) ||
        (request.email || "").toLowerCase().includes(term) ||
        (request.utr || "").toLowerCase().includes(term)
      );
    })
    .filter((request) => {
      if (
        columnFilters.requestId &&
        !request.id.toLowerCase().startsWith(columnFilters.requestId.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        columnFilters.requestType !== "all" &&
        request.type !== columnFilters.requestType
      ) {
        return false;
      }
      if (columnFilters.source !== "all" && request.source !== columnFilters.source) {
        return false;
      }
      const requestDate = getDateOnly(request.requestedOn);
      const fromBoundary = columnFilters.requestedFrom
        ? getDateOnly(columnFilters.requestedFrom)
        : null;
      const toBoundary = columnFilters.requestedTo ? getDateOnly(columnFilters.requestedTo) : null;
      if (fromBoundary && requestDate && requestDate < fromBoundary) {
        return false;
      }
      if (toBoundary && requestDate && requestDate > toBoundary) {
        return false;
      }
      if (
        columnFilters.donationId &&
        !(request.donationId || "")
          .toLowerCase()
          .includes(columnFilters.donationId.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        columnFilters.status !== "all" &&
        request.status !== columnFilters.status
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.requestedOn) - new Date(a.requestedOn));

  const handleApprove = (row) => {
    if (row.status !== "pending") return;
    setRequestsData((prev) =>
      prev.map((req) => (req.id === row.id ? { ...req, status: "approved" } : req))
    );
    setHighlight({ id: row.id, variant: "approved" });
    setTimeout(() => setHighlight(null), 1000);
  };

  const handleRejectClick = (row) => {
    if (row.status !== "pending") return;
    setRejectModal({ open: true, request: row, reason: "", error: "" });
  };

  const submitRejection = () => {
    if (!rejectModal.reason.trim()) {
      setRejectModal((prev) => ({ ...prev, error: "Please provide a rejection comment." }));
      return;
    }
    setRequestsData((prev) =>
      prev.map((req) =>
        req.id === rejectModal.request.id
          ? { ...req, status: "rejected", comment: rejectModal.reason.trim() }
          : req
      )
    );
    setHighlight({ id: rejectModal.request.id, variant: "rejected" });
    setTimeout(() => setHighlight(null), 1000);
    setRejectModal({ open: false, request: null, reason: "", error: "" });
  };

  const formatDateDisplay = (value) =>
    new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStatusLabel = (status) => {
    if (status === "approved" || status === "completed") return "Approved";
    if (status === "rejected") return "Rejected";
    return "Pending";
  };

  const getSourceLabel = (source) =>
    source === "ADMIN_BULK_UPLOAD" ? "Admin Submitted" : "User Submitted";
  const getSourceVariant = (source) => (source === "ADMIN_BULK_UPLOAD" ? "admin" : "user");

  const handleMapDonation = (match, request) => {
    const mappedDonationId =
      match.donationId ||
      `DN${(match.utr || "").slice(-4).padStart(4, "0").toUpperCase()}`;
    setRequestsData((prev) =>
      prev.map((req) =>
        req.id === request.id
          ? { ...req, donationId: mappedDonationId, status: "approved" }
          : req
      )
    );
    setDetailRequest((prev) =>
      prev
        ? {
            ...prev,
            donationId: mappedDonationId,
            status: "approved",
          }
        : prev
    );
    setHighlight({ id: request.id, variant: "approved" });
    setTimeout(() => setHighlight(null), 1000);
  };

  const renderMatchSection = (request) => {
    if (!request) return null;
    const matches = request.probableMatches || [];
    return (
      <section className="match-section">
        <p className="match-title">Probable Matches from Bank Statements</p>
        {matches.length ? (
          matches.map((match) => (
            <div className="match-card" key={match.id}>
              <div>
                <p className="match-info">
                  <strong>{match.date}</strong> · {match.amount} · {match.mode}
                </p>
                <p className="match-utr">UTR: {match.utr || "—"}</p>
              </div>
              <div className="match-actions">
                <span className="confidence-badge">{match.confidence}% match</span>
                <button
                  type="button"
                  className="map-entry-btn"
                  onClick={() => handleMapDonation(match, request)}
                  disabled={request.status !== "pending"}
                >
                  Map This Entry
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-matches-box">
            <p>No probable matches found in the uploaded bank statements.</p>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="dashboard all-requests-page">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>All Requests</h1>
            <p className="all-requests-sub">
              View and manage all user-submitted requests in one place.
            </p>
          </div>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="all-requests-card">
          <div className="requests-filter-bar">
            <div className="date-controls">
              <label className="date-field">
                <span>Start Date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                />
              </label>
              <label className="date-field">
                <span>End Date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleEndDateChange(e.target.value)}
                />
              </label>
            </div>
            <div className="quick-filters">
              {[
                { key: "thisMonth", label: "This Month" },
                { key: "last3Months", label: "Last 3 Months" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className={`quick-filter-btn${quickRange === filter.key ? " active" : ""}`}
                  onClick={() => setRange(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
              <FinancialYearDropdown selectedYear={selectedFY} onSelect={handleFinancialYearSelect} />
            </div>
          </div>

          <div className="requests-search">
            <span aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <circle cx="9" cy="9" r="6" strokeWidth="1.4" />
                <path d="m14 14 3 3" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by Request ID, Donation ID, Donor Name, Phone Number, Email, or UTR"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="requests-table-card">
            <table className="requests-table">
              <thead>
                <tr>
                  <HeaderFilter
                    label="Request ID"
                    column="reqId"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("requestId")}
                  >
                    <label className="filter-field">
                      <span className="filter-label">Starts with</span>
                      <input
                        type="text"
                        className="filter-input"
                        placeholder="RQ"
                        value={columnFilters.requestId}
                        onChange={(e) => updateColumnFilter("requestId", e.target.value)}
                      />
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Request Type"
                    column="reqType"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("requestType")}
                  >
                    <label className="filter-field">
                      <span className="filter-label">Type</span>
                      <select
                        className="filter-input"
                        value={columnFilters.requestType}
                        onChange={(e) => updateColumnFilter("requestType", e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="Missing Donation">Missing Donation</option>
                      </select>
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Source"
                    column="source"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("source")}
                  >
                    <label className="filter-field">
                      <span className="filter-label">Source</span>
                      <select
                        className="filter-input"
                        value={columnFilters.source}
                        onChange={(e) => updateColumnFilter("source", e.target.value)}
                      >
                        <option value="all">All Sources</option>
                        <option value="USER">User Submitted</option>
                        <option value="ADMIN_BULK_UPLOAD">Admin Submitted</option>
                      </select>
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Requested On"
                    column="requestedOn"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("requestedFrom", "requestedTo")}
                  >
                    <label className="filter-field">
                      <span className="filter-label">From</span>
                      <input
                        type="date"
                        className="filter-input"
                        value={columnFilters.requestedFrom}
                        onChange={(e) => updateColumnFilter("requestedFrom", e.target.value)}
                      />
                    </label>
                    <label className="filter-field">
                      <span className="filter-label">To</span>
                      <input
                        type="date"
                        className="filter-input"
                        value={columnFilters.requestedTo}
                        onChange={(e) => updateColumnFilter("requestedTo", e.target.value)}
                      />
                    </label>
                    <div className="filter-quick">
                      <button
                        type="button"
                        className={columnDatePreset === "today" ? "active" : ""}
                        onClick={() => setRequestedQuickRange("today")}
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        className={columnDatePreset === "last7" ? "active" : ""}
                        onClick={() => setRequestedQuickRange("last7")}
                      >
                        Last 7 days
                      </button>
                      <button
                        type="button"
                        className={columnDatePreset === "last30" ? "active" : ""}
                        onClick={() => setRequestedQuickRange("last30")}
                      >
                        Last 30 days
                      </button>
                      <button
                        type="button"
                        className={columnDatePreset === "thisYear" ? "active" : ""}
                        onClick={() => setRequestedQuickRange("thisYear")}
                      >
                        This Year
                      </button>
                    </div>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Donation"
                    column="donation"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("donationId")}
                  >
                    <label className="filter-field">
                      <span className="filter-label">Donation ID</span>
                      <input
                        type="text"
                        className="filter-input"
                        placeholder="DN"
                        value={columnFilters.donationId}
                        onChange={(e) => updateColumnFilter("donationId", e.target.value)}
                      />
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Map Donation"
                    column="map"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                  >
                    <p className="filter-hint">Filter not available</p>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Details"
                    column="details"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                  >
                    <p className="filter-hint">Filter not available</p>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Status"
                    column="status"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("status")}
                  >
                    <label className="filter-field">
                      <span className="filter-label">Status</span>
                      <select
                        className="filter-input"
                        value={columnFilters.status}
                        onChange={(e) => updateColumnFilter("status", e.target.value)}
                      >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Action"
                    column="action"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                  >
                    <p className="filter-hint">Use Map column to reconcile</p>
                  </HeaderFilter>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((row) => (
                  <tr
                    key={row.id}
                    className={
                      highlight?.id === row.id ? `row-highlight ${highlight.variant}` : ""
                    }
                  >
                    <td>{row.id}</td>
                    <td>{row.type}</td>
                    <td>
                      <span className={`source-chip ${getSourceVariant(row.source)}`}>
                        {getSourceLabel(row.source)}
                      </span>
                    </td>
                    <td>{formatDateDisplay(row.requestedOn)}</td>
                    <td>{row.donationId || "Pending Mapping"}</td>
                    <td>
                      <button
                        type="button"
                        className="map-btn"
                        onClick={() => setMatchModalRequest(row)}
                        disabled={!row.probableMatches || !row.probableMatches.length}
                      >
                        Map
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="view-details-btn"
                        onClick={() => setDetailRequest(row)}
                      >
                        View Details
                      </button>
                    </td>
                    <td>
                      <span className={`request-status ${row.status}`}>
                        {getStatusLabel(row.status)}
                      </span>
                    </td>
                    <td className="request-actions">
                      <button
                        type="button"
                        className="action-icon approve"
                        onClick={() => handleApprove(row)}
                        disabled={row.status !== "pending"}
                        aria-label="Approve"
                      >
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                          <path
                            d="m4.5 10.5 3.5 3.5 7.5-7.5"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="action-icon reject"
                        onClick={() => handleRejectClick(row)}
                        disabled={row.status !== "pending"}
                        aria-label="Reject"
                      >
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                          <path
                            d="m6 6 8 8M14 6l-8 8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {detailRequest && (
        <div className="all-requests-modal-backdrop">
          <div className="all-requests-modal">
            <header className="modal-header">
              <div>
                <h2>Request Details</h2>
                <p>Detailed information submitted by the donor</p>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setDetailRequest(null)}
              >
                &times;
              </button>
            </header>
            <div className="metadata-grid">
              <div>
                <span>Request ID</span>
                <p>{detailRequest.id}</p>
              </div>
              <div>
                <span>Request Type</span>
                <p>{detailRequest.type}</p>
              </div>
              <div>
                <span>Source</span>
                <p>{getSourceLabel(detailRequest.source)}</p>
              </div>
              <div>
                <span>Requested On</span>
                <p>{formatDateDisplay(detailRequest.requestedOn)}</p>
              </div>
              <div>
                <span>Status</span>
                <p>{detailRequest.status}</p>
              </div>
            </div>
            <div className="metadata-grid two-column">
              <div>
                <span>Date of Transaction</span>
                <p>{detailRequest.details.transactionDate}</p>
              </div>
              <div>
                <span>Donation Amount</span>
                <p>{detailRequest.amount}</p>
              </div>
              <div>
                <span>Mode of Payment</span>
                <p>{detailRequest.details.mode}</p>
              </div>
              <div>
                <span>UPI Handle / Bank Name</span>
                <p>{detailRequest.details.handle}</p>
              </div>
              <div>
                <span>Screenshot / Proof</span>
                {detailRequest.details.screenshot ? (
                  <button type="button" className="link-btn">
                    Download
                  </button>
                ) : (
                  <p>—</p>
                )}
              </div>
              <div className="full-width">
                <span>Additional Notes</span>
                <p>{detailRequest.details.notes || "—"}</p>
              </div>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="outline-btn"
                onClick={() => setDetailRequest(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {rejectModal.open && (
        <div className="reject-modal-backdrop">
          <div className="reject-modal">
            <h3>Reject Request</h3>
            <p>Please enter the reason for rejection.</p>
            <textarea
              rows={3}
              value={rejectModal.reason}
              onChange={(e) =>
                setRejectModal((prev) => ({ ...prev, reason: e.target.value, error: "" }))
              }
              placeholder="Add your comments..."
            />
            {rejectModal.error && <p className="error-text">{rejectModal.error}</p>}
            <div className="reject-actions">
              <button
                type="button"
                className="outline-btn"
                onClick={() =>
                  setRejectModal({ open: false, request: null, reason: "", error: "" })
                }
              >
                Cancel
              </button>
              <button type="button" className="solid-btn" onClick={submitRejection}>
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
      {matchModalRequest && (
        <div className="match-modal-backdrop">
          <div className="match-modal">
            <header className="modal-header">
              <div>
                <h2>Map Donation</h2>
                <p>Review probable matches and map the correct bank entry</p>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setMatchModalRequest(null)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </header>
            <div className="map-modal-summary">
              <div className="summary-pill">
                <span>Request ID</span>
                <strong>{matchModalRequest.id}</strong>
              </div>
              <div className="summary-pill">
                <span>Type</span>
                <strong>{matchModalRequest.type}</strong>
              </div>
              <div className="summary-pill">
                <span>Source</span>
                <span className={`source-chip ${getSourceVariant(matchModalRequest.source)}`}>
                  {getSourceLabel(matchModalRequest.source)}
                </span>
              </div>
              <div className="summary-pill">
                <span>Requested On</span>
                <strong>{formatDateDisplay(matchModalRequest.requestedOn)}</strong>
              </div>
              <div className="summary-pill">
                <span>Amount</span>
                <strong>{matchModalRequest.amount}</strong>
              </div>
            </div>
            {renderMatchSection(matchModalRequest)}
            <div className="modal-actions">
              <button
                type="button"
                className="outline-btn"
                onClick={() => setMatchModalRequest(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function useColumnFilterState() {
  const [openColumn, setOpenColumn] = useState(null);
  useEffect(() => {
    const handleClick = () => setOpenColumn(null);
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpenColumn(null);
      }
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);
  return [openColumn, setOpenColumn];
}

function HeaderFilter({
  label,
  column,
  openColumn,
  setOpenColumn,
  children,
  onApply,
  onReset,
  className = "",
}) {
  const thRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0 });
  const toggle = (event) => {
    event.stopPropagation();
    setOpenColumn(openColumn === column ? null : column);
  };
  const handleApply = () => {
    if (onApply) onApply();
    setOpenColumn(null);
  };
  const handleReset = () => {
    if (onReset) onReset();
    setOpenColumn(null);
  };
  useEffect(() => {
    if (openColumn !== column) return;
    const reposition = () => {
      if (!thRef.current) return;
      const headerRect = thRef.current.getBoundingClientRect();
      const dropdownEl = dropdownRef.current;
      const dropdownWidth = dropdownEl?.offsetWidth || 230;
      const dropdownHeight = dropdownEl?.offsetHeight || 200;
      const padding = 12;
      let left = headerRect.left;
      if (left + dropdownWidth + padding > window.innerWidth) {
        left = window.innerWidth - dropdownWidth - padding;
      }
      if (left < padding) left = padding;
      let top = headerRect.bottom + 4;
      if (top + dropdownHeight > window.innerHeight - padding) {
        top = headerRect.top - dropdownHeight - 4;
        if (top < padding) top = padding;
      }
      setDropdownStyle({ top, left });
    };
    const frame = requestAnimationFrame(reposition);
    const handleScroll = () => reposition();
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [openColumn, column]);

  return (
    <th ref={thRef} className={`th-filter${className ? ` ${className}` : ""}`}>
      <div className="th-label">
        <span>{label}</span>
        <button
          type="button"
          className={`filter-icon${openColumn === column ? " active" : ""}`}
          onClick={toggle}
          aria-label={`Filter ${label}`}
        >
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor">
            <path
              d="M3 4h12M6.5 9h5m-2.5 5v-5"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {openColumn === column &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            className="filter-dropdown"
            style={{ top: dropdownStyle.top, left: dropdownStyle.left }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
            <div className="filter-actions">
              <button type="button" className="apply-btn" onClick={handleApply}>
                Apply
              </button>
              <button type="button" className="reset-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>,
          document.body
        )}
    </th>
  );
}

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [method, setMethod] = useState("password");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!otpRequested || otpTimer === 0) return;
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [otpRequested, otpTimer]);

  const resetErrors = () => {
    setErrors({});
    setGlobalError("");
  };

  const validatePhone = () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid 10-digit phone number.",
      }));
      return false;
    }
    return true;
  };

  const handlePhoneChange = (value) => {
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleLogin = () => {
    resetErrors();
    if (!validatePhone()) return;
    if (method === "password") {
      if (password.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters.",
        }));
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setGlobalError("");
        setUser((prev) => ({
          ...prev,
          authMethod: "mobile",
          countryCode: "+91",
          mobileNumber: phone,
        }));
        navigate("/overview");
      }, 800);
    }
  };

  const handleSendOtp = () => {
    resetErrors();
    if (!validatePhone()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpRequested(true);
      setOtpTimer(30);
      setGlobalError("");
    }, 600);
  };

  const handleVerifyOtp = () => {
    resetErrors();
    if (otp.length < 4) {
      setErrors((prev) => ({ ...prev, otp: "Invalid OTP. Please try again." }));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser((prev) => ({
        ...prev,
        authMethod: "mobile",
        countryCode: "+91",
        mobileNumber: phone,
      }));
      navigate("/overview");
    }, 800);
  };

  const handleGoogleLogin = () => {
    setGlobalError("");
    setUser((prev) => ({
      ...prev,
      authMethod: "google",
      countryCode: prev.countryCode || "+91",
      mobileNumber: "",
    }));
    navigate("/overview");
  };

  const renderOtpSection = () => {
    if (!otpRequested) {
      return (
        <button
          type="button"
          className="primary-btn"
          onClick={handleSendOtp}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      );
    }

    return (
      <>
        <div className="field">
          <label>Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setOtp(e.target.value);
                setErrors((prev) => ({ ...prev, otp: "" }));
              }
            }}
            placeholder="Enter the OTP"
          />
          {errors.otp && <p className="error-text">{errors.otp}</p>}
        </div>
        <div className="otp-meta">
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              setOtpRequested(false);
              setOtp("");
              setOtpTimer(0);
            }}
          >
            Change number
          </button>
          <button
            type="button"
            className="link-btn"
            disabled={otpTimer > 0}
            onClick={() => setOtpTimer(30)}
          >
            {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
          </button>
        </div>
        <button
          type="button"
          className="primary-btn"
          onClick={handleVerifyOtp}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify & Login"}
        </button>
      </>
    );
  };

  return (
    <div className="login-page">
      <div className="login-card minimal">
        <div className="login-brand">
          <h1>ISKCON Whitefield</h1>
          <p>Login</p>
        </div>

        {globalError && <div className="global-error">{globalError}</div>}

        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
          <span className="google-icon">G</span>
          Login with Google
        </button>

        <div className="login-divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        <button
          type="button"
          className={`mobile-toggle ${mobileOpen ? "active" : ""}`}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          Login with Mobile
        </button>

        {mobileOpen && (
          <div className="mobile-panel">
            <div className={`field ${errors.phone ? "has-error" : ""}`}>
              <label>Mobile Number</label>
              <div className="input-wrapper">
                <span className="country-prefix">+91</span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Enter your mobile number"
                  maxLength={10}
                />
              </div>
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div className="login-tabs">
              <button
                type="button"
                className={`login-tab ${method === "password" ? "active" : ""}`}
                onClick={() => {
                  setMethod("password");
                  setOtpRequested(false);
                  setOtp("");
                  setOtpTimer(0);
                }}
              >
                Password
              </button>
              <button
                type="button"
                className={`login-tab ${method === "otp" ? "active" : ""}`}
                onClick={() => {
                  setMethod("otp");
                  setPassword("");
                }}
              >
                OTP
              </button>
            </div>

            {method === "password" && (
              <>
                <div className={`field ${errors.password ? "has-error" : ""}`}>
                  <label>Password</label>
                  <div className="input-wrapper password">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="toggle-visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="error-text">{errors.password}</p>
                  )}
                  <button type="button" className="link-btn align-left">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </>
            )}

            {method === "otp" && renderOtpSection()}
          </div>
        )}

        <p className="signup-text">
          Don’t have an account?{" "}
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="app-root">
      <div className="auth-shell">
        <section className="auth-card">
          <h1 className="auth-title">Create Account</h1>

          <form className="auth-form">
            <div className="field">
              <label>Full Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 98765 43210" />
            </div>
            <div className="field field-otp">
              <label>One-time Password</label>
              <div className="otp-row">
                <input type="text" placeholder="Enter 6-digit OTP" />
                <button type="button" className="ghost-btn">
                  Send OTP
                </button>
              </div>
            </div>

            <button type="button" className="primary-btn">
              Sign Up
            </button>
            <p className="small-text">
              Have an account?{" "}
              <button
                className="link-btn"
                type="button"
                onClick={() => navigate("/")}
              >
                Back to login
              </button>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

function Overview() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [phoneForm, setPhoneForm] = useState({
    countryCode: user.countryCode || "+91",
    mobile: user.mobileNumber || "",
  });
  const [phoneError, setPhoneError] = useState("");

  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };
  const needsPhoneUpdate =
    user.authMethod === "google" && !user.mobileNumber?.length;
  const openPhoneModal = () => {
    setPhoneForm({
      countryCode: user.countryCode || "+91",
      mobile: user.mobileNumber || "",
    });
    setPhoneError("");
    setPhoneModalOpen(true);
  };

  const closePhoneModal = () => {
    setPhoneModalOpen(false);
    setPhoneError("");
  };

  const handlePhoneInput = (value) => {
    if (/^\d*$/.test(value)) {
      setPhoneForm((prev) => ({ ...prev, mobile: value }));
      setPhoneError("");
    }
  };

  const handlePhoneSave = () => {
    if (!phoneForm.mobile) {
      setPhoneError("Please enter your mobile number.");
      return;
    }
    if (phoneForm.countryCode === "+91" && phoneForm.mobile.length !== 10) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (phoneForm.mobile.length < 5) {
      setPhoneError("Please enter a valid mobile number.");
      return;
    }
    setUser((prev) => ({
      ...prev,
      countryCode: phoneForm.countryCode,
      mobileNumber: phoneForm.mobile,
    }));
    setPhoneModalOpen(false);
  };

  return (
    <div className="dashboard">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Overview</h1>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {needsPhoneUpdate && (
          <section className="phone-reminder">
            <div>
              <p className="reminder-kicker">Action Required</p>
              <h2>Add your mobile number</h2>
              <p>
                Donation tracking requires a verified mobile number. Add your phone
                number to update all your donations and receipts.
              </p>
            </div>
            <button
              type="button"
              className="phone-reminder-action"
              onClick={openPhoneModal}
            >
              <span className="phone-action-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M5 4h4l1.5 4.5-2.5 1.5c1 2 2.5 3.5 4.5 4.5l1.5-2.5L20 13v4c0 1.1-.9 2-2 2A14 14 0 0 1 4 6c0-1.1.9-2 2-2Z"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 5h4v4"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Add Mobile Number
            </button>
          </section>
        )}

        <section className="profile-card">
          <div>
            <p className="profile-label">Profile Completion</p>
            <h2>Complete your profile to ensure correct information on your receipts.</h2>
            <p className="profile-note">Your profile is 72% complete.</p>
            <button className="cta-btn" onClick={() => navigate("/profile")}>
              Complete My Profile
            </button>
          </div>
          <div className="completion-ring">
            <span>72% complete</span>
          </div>
        </section>

        <div className="contribution-grid">
          <div className="contribution-card">
            <p className="card-title">
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 13h6.4l2.6-3 3 3H20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 13v4.4a2.6 2.6 0 0 0 5.2 0V9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="8" r="2" strokeWidth="1.5" />
                </svg>
              </span>
              My Donation Seva
            </p>
            <p className="card-sub">
              Total amount of all your successful donation.
            </p>
            <p className="card-amount">
              <span className="currency-pill">₹</span>12,500
            </p>
            <button className="ghost-view" onClick={() => navigate("/donations")}>
              View
            </button>
          </div>
          <div className="contribution-card">
            <p className="card-title">
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 5v14" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6 7h9l-2.2 4 2.2 4H6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="17.5" cy="9.5" r="2" strokeWidth="1.2" />
                </svg>
              </span>
              My Fundraising Seva
            </p>
            <p className="card-sub">
              Donations collected through fundraisers you ran.
            </p>
            <p className="card-amount">
              <span className="currency-pill">₹</span>3,000
            </p>
            <button className="ghost-view" onClick={() => navigate("/fundraising")}>
              View
            </button>
          </div>
        </div>

      </main>
      {phoneModalOpen && (
        <div className="phone-modal-overlay" role="dialog" aria-modal="true">
          <div className="phone-modal">
            <h3>Add your mobile number</h3>
            <p>
              We’ll use this number to map your donations, send SMS confirmations,
              and generate 80G receipts.
            </p>
            <div className="phone-modal-grid">
              <label className="phone-field">
                <span>Country code</span>
                <div className="phone-select">
                  <select
                    value={phoneForm.countryCode}
                    onChange={(e) =>
                      setPhoneForm((prev) => ({
                        ...prev,
                        countryCode: e.target.value,
                      }))
                    }
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <span aria-hidden="true">▾</span>
                </div>
              </label>
              <label className="phone-field">
                <span>Mobile number</span>
                <input
                  type="text"
                  value={phoneForm.mobile}
                  onChange={(e) => handlePhoneInput(e.target.value)}
                  placeholder="Enter your mobile number"
                  maxLength={12}
                />
              </label>
            </div>
            {phoneError && <p className="error-text">{phoneError}</p>}
            <div className="phone-modal-actions">
              <button type="button" className="outline-btn" onClick={closePhoneModal}>
                Cancel
              </button>
              <button type="button" className="solid-btn" onClick={handlePhoneSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MyDonationSeva() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [eightyModalOpen, setEightyModalOpen] = useState(false);
  const [eightyForm, setEightyForm] = useState({
    fullName: "",
    pan: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
    country: "India",
  });
  const [eightyErrors, setEightyErrors] = useState({});
  const [donationFilterOpen, setDonationFilterOpen] = useColumnFilterState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quickRange, setQuickRange] = useState("");
  const [selectedFY, setSelectedFY] = useState("");
  const [donationDatePreset, setDonationDatePreset] = useState("");
  const donationFilterDefaults = {
    donationId: "",
    dateFrom: "",
    dateTo: "",
    amountMin: "",
    amountMax: "",
    mode: "all",
    scheme: "",
    utr: "",
    status: "all",
    eighty: "all",
  };
  const [donationFilters, setDonationFilters] = useState(donationFilterDefaults);

  const syncDonationDates = (fromValue, toValue) => {
    setStartDate(fromValue);
    setEndDate(toValue);
    setDonationFilters((prev) => ({
      ...prev,
      dateFrom: fromValue,
      dateTo: toValue,
    }));
  };

  const handleDonationStartChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setStartDate(value);
    setDonationFilters((prev) => ({ ...prev, dateFrom: value }));
  };

  const handleDonationEndChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setEndDate(value);
    setDonationFilters((prev) => ({ ...prev, dateTo: value }));
  };

  const setDonationRange = (range) => {
    setQuickRange(range);
    setSelectedFY("");
    const today = new Date();
    const endBoundary = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let startBoundary = new Date(endBoundary);
    if (range === "thisMonth") {
      startBoundary = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (range === "last3Months") {
      startBoundary = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    }
    const startValue = startBoundary.toISOString().split("T")[0];
    const endValue = endBoundary.toISOString().split("T")[0];
    syncDonationDates(startValue, endValue);
  };

  const handleDonationFinancialYear = (option) => {
    setSelectedFY(option.label);
    setQuickRange("");
    setDonationDatePreset("");
    syncDonationDates(option.startDate, option.endDate);
  };
  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const handleActiveReceipt = (donationId) => {
    window.open(`#80g-${donationId}`, "_blank", "noopener,noreferrer");
  };

  const openEightyModal = () => {
    setEightyForm({
      fullName: user.fullName || "",
      pan: user.pan || "",
      address1: user.address1 || "",
      address2: user.address2 || "",
      city: user.city || "",
      state: user.state || "",
      pin: user.pin || "",
      country: user.country || "India",
    });
    setEightyErrors({});
    setEightyModalOpen(true);
  };

  const closeEightyModal = () => {
    setEightyErrors({});
    setEightyModalOpen(false);
  };

  const handleEightyChange = (field, value) => {
    setEightyForm((prev) => ({ ...prev, [field]: value }));
    setEightyErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateEightyForm = () => {
    const errs = {};
    if (!eightyForm.fullName.trim()) errs.fullName = "Name is required.";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(eightyForm.pan.trim()))
      errs.pan = "Enter a valid PAN.";
    if (!eightyForm.address1.trim()) errs.address1 = "Address Line 1 is required.";
    if (!eightyForm.city.trim()) errs.city = "City is required.";
    if (!eightyForm.state.trim()) errs.state = "State is required.";
    if (!/^[0-9]{6}$/.test(eightyForm.pin.trim())) errs.pin = "Enter a valid 6-digit PIN.";
    if (!eightyForm.country.trim()) errs.country = "Country is required.";
    setEightyErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEightySubmit = () => {
    if (!validateEightyForm()) return;
    setUser((prev) => ({
      ...prev,
      fullName: eightyForm.fullName.trim(),
      pan: eightyForm.pan.trim().toUpperCase(),
      address1: eightyForm.address1.trim(),
      address2: eightyForm.address2.trim(),
      city: eightyForm.city.trim(),
      state: eightyForm.state.trim(),
      pin: eightyForm.pin.trim(),
      country: eightyForm.country,
    }));
    closeEightyModal();
  };

  const normalizedPan = (user.pan || "").toUpperCase();
  const isProfileComplete =
    Boolean(user.fullName?.trim()) &&
    /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(normalizedPan) &&
    Boolean(user.address1?.trim()) &&
    Boolean(user.city?.trim()) &&
    Boolean(user.state?.trim()) &&
    /^[0-9]{6}$/.test(user.pin || "") &&
    Boolean(user.country?.trim());

  const renderEightyStatus = (donation) => {
    if (donation.status !== "success" || !donation.schemeEligible) {
      return <span className="receipt-pill neutral">Not App.</span>;
    }
    if (!isProfileComplete) {
      return (
        <button
          type="button"
          className="receipt-pill generate"
          onClick={openEightyModal}
        >
          Generate
        </button>
      );
    }
    return (
      <button
        type="button"
        className="receipt-pill view"
        onClick={() => handleActiveReceipt(donation.id)}
      >
        View
      </button>
    );
  };

  const updateDonationFilters = (key, value) => {
    setDonationFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "dateFrom" || key === "dateTo") {
      setDonationDatePreset("");
    }
  };

  const resetDonationFilters = (...keys) => {
    setDonationFilters((prev) => {
      const next = { ...prev };
      keys.forEach((key) => {
        next[key] = donationFilterDefaults[key];
      });
      return next;
    });
    if (keys.includes("dateFrom") || keys.includes("dateTo")) {
      setDonationDatePreset("");
    }
  };

  const getEightyFilterValue = (donation) => {
    if (donation.status !== "success" || !donation.schemeEligible) return "not-applicable";
    return isProfileComplete ? "view" : "generate";
  };

  const applyDonationDatePreset = (range) => {
    setDonationDatePreset(range);
    const today = new Date();
    let start = new Date(today);
    let end = new Date(today);
    if (range === "last7") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    } else if (range === "last30") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
    } else if (range === "thisYear") {
      start = new Date(today.getFullYear(), 0, 1);
    }
    setDonationFilters((prev) => ({
      ...prev,
      dateFrom: formatDateInputValue(start),
      dateTo: formatDateInputValue(end),
    }));
  };

  const filteredDonations = donationRows.filter((donation) => {
    const donationDate = getDateOnly(donation.date);
    if (startDate) {
      const startBoundary = getDateOnly(startDate);
      if (startBoundary && donationDate && donationDate < startBoundary) return false;
    }
    if (endDate) {
      const endBoundary = getDateOnly(endDate);
      if (endBoundary && donationDate && donationDate > endBoundary) return false;
    }
    if (
      donationFilters.donationId &&
      !donation.id.toLowerCase().includes(donationFilters.donationId.trim().toLowerCase())
    ) {
      return false;
    }
    const fromBoundary = donationFilters.dateFrom ? getDateOnly(donationFilters.dateFrom) : null;
    const toBoundary = donationFilters.dateTo ? getDateOnly(donationFilters.dateTo) : null;
    if (fromBoundary && donationDate && donationDate < fromBoundary) return false;
    if (toBoundary && donationDate && donationDate > toBoundary) return false;
    const amountValue = parseAmountValue(donation.amount);
    if (
      donationFilters.amountMin &&
      amountValue < Number(donationFilters.amountMin || 0)
    ) {
      return false;
    }
    if (
      donationFilters.amountMax &&
      amountValue > Number(donationFilters.amountMax || 0)
    ) {
      return false;
    }
    if (
      donationFilters.mode !== "all" &&
      donation.mode.toLowerCase() !== donationFilters.mode.toLowerCase()
    ) {
      return false;
    }
    if (
      donationFilters.scheme &&
      !donation.scheme.toLowerCase().includes(donationFilters.scheme.trim().toLowerCase())
    ) {
      return false;
    }
    if (
      donationFilters.utr &&
      !(donation.utr || "").toLowerCase().includes(donationFilters.utr.trim().toLowerCase())
    ) {
      return false;
    }
    if (donationFilters.status !== "all" && donation.status !== donationFilters.status) {
      return false;
    }
    if (
      donationFilters.eighty !== "all" &&
      getEightyFilterValue(donation) !== donationFilters.eighty
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="dashboard">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Donation Seva</h1>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="donation-section">

          <div className="donation-filters">
            <div className="date-pickers">
              <label>
                <span>Start Date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDonationStartChange(e.target.value)}
                />
              </label>
              <label>
                <span>End Date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleDonationEndChange(e.target.value)}
                />
              </label>
            </div>
            <div className="quick-filters">
              {[
                { key: "thisMonth", label: "This Month" },
                { key: "last3Months", label: "Last 3 Months" },
              ].map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  className={`quick-filter-btn${quickRange === chip.key ? " active" : ""}`}
                  onClick={() => setDonationRange(chip.key)}
                >
                  {chip.label}
                </button>
              ))}
              <FinancialYearDropdown
                selectedYear={selectedFY}
                onSelect={handleDonationFinancialYear}
              />
            </div>
          </div>

          <div className="donation-table-card">
            <div className="table-title-row">
              <div>
                <p className="section-kicker">History</p>
                <h3>Last 10 Donations</h3>
              </div>
            </div>
            <div className="table-scroll">
              <table className="donation-table">
                <thead>
                  <tr>
                    <HeaderFilter
                      label="ID"
                      column="donationId"
                      openColumn={donationFilterOpen}
                      setOpenColumn={setDonationFilterOpen}
                      onReset={() => resetDonationFilters("donationId")}
                      className="col-id"
                    >
                      <label className="filter-field">
                        <span>Donation ID</span>
                        <input
                          type="text"
                          placeholder="DN"
                          value={donationFilters.donationId}
                          onChange={(e) => updateDonationFilters("donationId", e.target.value)}
                        />
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Date"
                      column="date"
                      openColumn={donationFilterOpen}
                      setOpenColumn={setDonationFilterOpen}
                      onReset={() => resetDonationFilters("dateFrom", "dateTo")}
                      className="col-date"
                    >
                      <label className="filter-field">
                        <span>From</span>
                        <input
                          type="date"
                          value={donationFilters.dateFrom}
                          onChange={(e) => updateDonationFilters("dateFrom", e.target.value)}
                        />
                      </label>
                      <label className="filter-field">
                        <span>To</span>
                        <input
                          type="date"
                          value={donationFilters.dateTo}
                          onChange={(e) => updateDonationFilters("dateTo", e.target.value)}
                        />
                      </label>
                      <div className="filter-quick">
                        <button
                          type="button"
                          className={donationDatePreset === "today" ? "active" : ""}
                          onClick={() => applyDonationDatePreset("today")}
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          className={donationDatePreset === "last7" ? "active" : ""}
                          onClick={() => applyDonationDatePreset("last7")}
                        >
                          Last 7 days
                        </button>
                        <button
                          type="button"
                          className={donationDatePreset === "last30" ? "active" : ""}
                          onClick={() => applyDonationDatePreset("last30")}
                        >
                          Last 30 days
                        </button>
                        <button
                          type="button"
                          className={donationDatePreset === "thisYear" ? "active" : ""}
                          onClick={() => applyDonationDatePreset("thisYear")}
                        >
                          This Year
                        </button>
                      </div>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Amount"
                      column="amount"
                      openColumn={donationFilterOpen}
                      setOpenColumn={setDonationFilterOpen}
                      onReset={() => resetDonationFilters("amountMin", "amountMax")}
                      className="col-amount"
                    >
                      <label className="filter-field">
                        <span>Min</span>
                        <input
                          type="number"
                          placeholder="₹"
                          value={donationFilters.amountMin}
                          onChange={(e) => updateDonationFilters("amountMin", e.target.value)}
                        />
                      </label>
                      <label className="filter-field">
                        <span>Max</span>
                        <input
                          type="number"
                          placeholder="₹"
                          value={donationFilters.amountMax}
                          onChange={(e) => updateDonationFilters("amountMax", e.target.value)}
                        />
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Mode"
                      column="mode"
                      openColumn={donationFilterOpen}
                      setOpenColumn={setDonationFilterOpen}
                      onReset={() => resetDonationFilters("mode")}
                      className="col-mode"
                    >
                      <label className="filter-field">
                        <span>Mode</span>
                        <select
                          value={donationFilters.mode}
                          onChange={(e) => updateDonationFilters("mode", e.target.value)}
                        >
                          <option value="all">All Modes</option>
                          <option value="UPI">UPI</option>
                          <option value="Net Banking">Net Banking</option>
                          <option value="Card">Card</option>
                          <option value="Cash">Cash</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Scheme"
                      column="scheme"
                      openColumn={donationFilterOpen}
                      setOpenColumn={setDonationFilterOpen}
                      onReset={() => resetDonationFilters("scheme")}
                      className="col-scheme"
                    >
                      <label className="filter-field">
                        <span>Scheme</span>
                        <input
                          type="text"
                          placeholder="Seva name"
                          value={donationFilters.scheme}
                          onChange={(e) => updateDonationFilters("scheme", e.target.value)}
                        />
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="UTR"
                      column="utr"
                      openColumn={donationFilterOpen}
                      setOpenColumn={setDonationFilterOpen}
                      onReset={() => resetDonationFilters("utr")}
                      className="col-utr"
                    >
                      <label className="filter-field">
                        <span>UTR</span>
                        <input
                          type="text"
                          placeholder="Reference"
                          value={donationFilters.utr}
                          onChange={(e) => updateDonationFilters("utr", e.target.value)}
                        />
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Status"
                      column="status"
                      openColumn={donationFilterOpen}
                      setOpenColumn={setDonationFilterOpen}
                      onReset={() => resetDonationFilters("status")}
                      className="col-status"
                    >
                      <label className="filter-field">
                        <span>Status</span>
                        <select
                          value={donationFilters.status}
                          onChange={(e) => updateDonationFilters("status", e.target.value)}
                        >
                          <option value="all">All</option>
                          <option value="success">Success</option>
                          <option value="pending">Pending</option>
                          <option value="failed">Failed</option>
                        </select>
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="ATG"
                      column="receipt"
                      openColumn={donationFilterOpen}
                      setOpenColumn={setDonationFilterOpen}
                      className="col-atg"
                    >
                      <p className="filter-hint">No filters available</p>
                    </HeaderFilter>
                    <HeaderFilter
                      label="80G"
                      column="eighty"
                      openColumn={donationFilterOpen}
                      setOpenColumn={setDonationFilterOpen}
                      onReset={() => resetDonationFilters("eighty")}
                      className="col-80g"
                    >
                      <label className="filter-field">
                        <span>80G</span>
                        <select
                          value={donationFilters.eighty}
                          onChange={(e) => updateDonationFilters("eighty", e.target.value)}
                        >
                          <option value="all">All</option>
                          <option value="not-applicable">Not Applicable</option>
                          <option value="generate">Generate</option>
                          <option value="view">View</option>
                        </select>
                      </label>
                    </HeaderFilter>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="col-id">{donation.id}</td>
                      <td className="col-date">{donation.date}</td>
                      <td className="col-amount">{donation.amount}</td>
                      <td className="col-mode">{donation.mode}</td>
                      <td className="col-scheme" title={donation.scheme}>
                        {donation.scheme || "—"}
                      </td>
                      <td className="col-utr" title={donation.utr}>
                        {donation.utr || "—"}
                      </td>
                      <td className="col-status">
                        <span className={`status-pill ${donation.status}`}>
                          {donation.status === "success" && "Success"}
                          {donation.status === "pending" && "Pending"}
                          {donation.status === "failed" && "Failed"}
                        </span>
                      </td>
                      <td className="col-atg">
                        {donation.status === "success" ? (
                          <button type="button" className="action-btn">
                            View
                          </button>
                        ) : (
                          <span className="muted-text">NA</span>
                        )}
                      </td>
                      <td className="col-80g">{renderEightyStatus(donation)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {eightyModalOpen && (
          <div className="eighty-modal-backdrop">
            <div className="eighty-modal">
              <h3>Generate your 80G Receipt</h3>
              <p>
                We need a few mandatory details as required by the Income Tax Department to issue
                your 80G certificate. These details will automatically update your profile.
              </p>
              <div className="eighty-form">
                <div className={`field full ${eightyErrors.fullName ? "has-error" : ""}`}>
                  <label>Full Name (as per PAN)</label>
                  <input
                    type="text"
                    value={eightyForm.fullName}
                    placeholder="Enter full name as per PAN"
                    onChange={(e) => handleEightyChange("fullName", e.target.value)}
                  />
                  {eightyErrors.fullName && (
                    <p className="error-text">{eightyErrors.fullName}</p>
                  )}
                </div>
                <div className={`field full ${eightyErrors.pan ? "has-error" : ""}`}>
                  <label>PAN Number</label>
                  <input
                    type="text"
                    value={eightyForm.pan}
                    placeholder="ABCDE1234F"
                    onChange={(e) =>
                      handleEightyChange("pan", e.target.value.toUpperCase())
                    }
                    maxLength={10}
                  />
                  {eightyErrors.pan && <p className="error-text">{eightyErrors.pan}</p>}
                </div>
                <div className={`field ${eightyErrors.address1 ? "has-error" : ""}`}>
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    value={eightyForm.address1}
                    placeholder="Flat / House / Building No."
                    onChange={(e) => handleEightyChange("address1", e.target.value)}
                  />
                  {eightyErrors.address1 && (
                    <p className="error-text">{eightyErrors.address1}</p>
                  )}
                </div>
                <div className="field">
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    value={eightyForm.address2}
                    placeholder="Street / Locality / Landmark"
                    onChange={(e) => handleEightyChange("address2", e.target.value)}
                  />
                </div>
                <div className={`field ${eightyErrors.city ? "has-error" : ""}`}>
                  <label>City / Town</label>
                  <input
                    type="text"
                    value={eightyForm.city}
                    placeholder="City / Town"
                    onChange={(e) => handleEightyChange("city", e.target.value)}
                  />
                  {eightyErrors.city && <p className="error-text">{eightyErrors.city}</p>}
                </div>
                <div className={`field ${eightyErrors.state ? "has-error" : ""}`}>
                  <label>State / Province</label>
                  <input
                    type="text"
                    value={eightyForm.state}
                    placeholder="State / Province"
                    onChange={(e) => handleEightyChange("state", e.target.value)}
                  />
                  {eightyErrors.state && <p className="error-text">{eightyErrors.state}</p>}
                </div>
                <div className={`field ${eightyErrors.pin ? "has-error" : ""}`}>
                  <label>PIN Code</label>
                  <input
                    type="text"
                    value={eightyForm.pin}
                    placeholder="6-digit PIN"
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value) && e.target.value.length <= 6) {
                        handleEightyChange("pin", e.target.value);
                      }
                    }}
                    maxLength={6}
                  />
                  {eightyErrors.pin && <p className="error-text">{eightyErrors.pin}</p>}
                </div>
                <div className={`field ${eightyErrors.country ? "has-error" : ""}`}>
                  <label>Country</label>
                  <div className="select-shell">
                    <select
                      value={eightyForm.country}
                      onChange={(e) => handleEightyChange("country", e.target.value)}
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Other">Other</option>
                    </select>
                    <span aria-hidden="true">▾</span>
                  </div>
                  {eightyErrors.country && (
                    <p className="error-text">{eightyErrors.country}</p>
                  )}
                </div>
              </div>
              <div className="eighty-actions">
                <button type="button" className="eighty-cancel" onClick={closeEightyModal}>
                  Cancel
                </button>
                <button type="button" className="eighty-primary" onClick={handleEightySubmit}>
                  Save &amp; Generate
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function MyFundraisingSeva() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const fundraisingLink = "https://donations.iskconwhitefield.org/?ref=12345";
  const [fundraisingFilterOpen, setFundraisingFilterOpen] = useColumnFilterState();
  const [fundraisingDatePreset, setFundraisingDatePreset] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quickRange, setQuickRange] = useState("");
  const [selectedFY, setSelectedFY] = useState("");
  const fundraisingFilterDefaults = {
    donor: "",
    dateFrom: "",
    dateTo: "",
    amountMin: "",
    amountMax: "",
    mode: "all",
    utr: "",
  };
  const [fundraisingFilters, setFundraisingFilters] = useState(fundraisingFilterDefaults);
  const [behalfForm, setBehalfForm] = useState({
    name: "",
    phone: "",
    date: "",
    amount: "",
    mode: "",
  });
  const [behalfErrors, setBehalfErrors] = useState({});
  const [behalfStatus, setBehalfStatus] = useState("");
  const [behalfOpen, setBehalfOpen] = useState(false);

  const syncFundraisingDates = (fromValue, toValue) => {
    setStartDate(fromValue);
    setEndDate(toValue);
    setFundraisingFilters((prev) => ({
      ...prev,
      dateFrom: fromValue,
      dateTo: toValue,
    }));
  };

  const handleFundraisingStartChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setStartDate(value);
    setFundraisingFilters((prev) => ({ ...prev, dateFrom: value }));
  };

  const handleFundraisingEndChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setEndDate(value);
    setFundraisingFilters((prev) => ({ ...prev, dateTo: value }));
  };

  const setFundraisingRange = (range) => {
    setQuickRange(range);
    setSelectedFY("");
    const today = new Date();
    const endBoundary = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let startBoundary = new Date(endBoundary);
    if (range === "thisMonth") {
      startBoundary = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (range === "last3Months") {
      startBoundary = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    }
    const startValue = startBoundary.toISOString().split("T")[0];
    const endValue = endBoundary.toISOString().split("T")[0];
    syncFundraisingDates(startValue, endValue);
  };

  const handleFundraisingFinancialYear = (option) => {
    setSelectedFY(option.label);
    setQuickRange("");
    setFundraisingDatePreset("");
    syncFundraisingDates(option.startDate, option.endDate);
  };

  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fundraisingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      setCopied(false);
    }
  };

  const handleBehalfChange = (field, value) => {
    setBehalfForm((prev) => ({ ...prev, [field]: value }));
    setBehalfErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateBehalfForm = () => {
    const errs = {};
    if (!behalfForm.name.trim()) errs.name = "Donor name is required.";
    if (!/^\d{10}$/.test(behalfForm.phone.trim())) errs.phone = "Enter a valid 10-digit number.";
    if (!behalfForm.date) errs.date = "Select the transaction date.";
    if (!behalfForm.amount || Number(behalfForm.amount) <= 0)
      errs.amount = "Enter a valid amount.";
    if (!behalfForm.mode) errs.mode = "Select a payment mode.";
    setBehalfErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBehalfSubmit = () => {
    if (!validateBehalfForm()) return;
    setBehalfStatus("Donation request submitted successfully.");
    setBehalfForm({
      name: "",
      phone: "",
      date: "",
      amount: "",
      mode: "",
    });
    setTimeout(() => setBehalfStatus(""), 2500);
  };

  const handleBehalfReset = () => {
    setBehalfForm({
      name: "",
      phone: "",
      date: "",
      amount: "",
      mode: "",
    });
    setBehalfErrors({});
    setBehalfStatus("");
  };

  const updateFundraisingFilters = (key, value) => {
    setFundraisingFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "dateFrom" || key === "dateTo") {
      setFundraisingDatePreset("");
    }
  };

  const resetFundraisingFilters = (...keys) => {
    setFundraisingFilters((prev) => {
      const next = { ...prev };
      keys.forEach((key) => {
        next[key] = fundraisingFilterDefaults[key];
      });
      return next;
    });
    if (keys.includes("dateFrom") || keys.includes("dateTo")) {
      setFundraisingDatePreset("");
    }
  };

  const applyFundraisingDatePreset = (range) => {
    setFundraisingDatePreset(range);
    const today = new Date();
    let start = new Date(today);
    let end = new Date(today);
    if (range === "last7") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    } else if (range === "last30") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
    } else if (range === "thisYear") {
      start = new Date(today.getFullYear(), 0, 1);
    }
    setFundraisingFilters((prev) => ({
      ...prev,
      dateFrom: formatDateInputValue(start),
      dateTo: formatDateInputValue(end),
    }));
  };

  const filteredFundraising = fundraisingRows.filter((entry) => {
    const entryDate = getDateOnly(entry.date);
    if (startDate) {
      const startBoundary = getDateOnly(startDate);
      if (startBoundary && entryDate && entryDate < startBoundary) return false;
    }
    if (endDate) {
      const endBoundary = getDateOnly(endDate);
      if (endBoundary && entryDate && entryDate > endBoundary) return false;
    }
    if (
      fundraisingFilters.donor &&
      !entry.name.toLowerCase().includes(fundraisingFilters.donor.trim().toLowerCase())
    ) {
      return false;
    }
    const fromBoundary = fundraisingFilters.dateFrom ? getDateOnly(fundraisingFilters.dateFrom) : null;
    const toBoundary = fundraisingFilters.dateTo ? getDateOnly(fundraisingFilters.dateTo) : null;
    if (fromBoundary && entryDate && entryDate < fromBoundary) return false;
    if (toBoundary && entryDate && entryDate > toBoundary) return false;
    const amountValue = parseAmountValue(entry.amount);
    if (
      fundraisingFilters.amountMin &&
      amountValue < Number(fundraisingFilters.amountMin || 0)
    ) {
      return false;
    }
    if (
      fundraisingFilters.amountMax &&
      amountValue > Number(fundraisingFilters.amountMax || 0)
    ) {
      return false;
    }
    if (
      fundraisingFilters.mode !== "all" &&
      entry.mode.toLowerCase() !== fundraisingFilters.mode.toLowerCase()
    ) {
      return false;
    }
    if (
      fundraisingFilters.utr &&
      !(entry.utr || "").toLowerCase().includes(fundraisingFilters.utr.trim().toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="dashboard">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Fundraising Seva</h1>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="fundraising-link-section">
          <div className="fundraising-link-card">
            <div className="fundraising-link-head">
              <h2>Your Fundraising Link</h2>
              <p>
                This link is unique to you. All donations made through it are
                tracked under your Fundraising Seva automatically.
              </p>
            </div>
            <div className="link-display">
              <input type="text" value={fundraisingLink} readOnly />
              <button
                type="button"
                className="copy-link-btn"
                onClick={handleCopy}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M9 9V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="3"
                    y="7"
                    width="12"
                    height="14"
                    rx="2"
                    strokeWidth="1.5"
                  />
                </svg>
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </section>

        <section className="behalf-card">
          <button
            type="button"
            className={`behalf-header${behalfOpen ? " open" : ""}`}
            onClick={() => setBehalfOpen((prev) => !prev)}
          >
            <div>
              <h3>Raise Donation on Behalf of Someone Else</h3>
            </div>
            <span className="chevron" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path
                  d="m6 8 4 4 4-4"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <div className={`behalf-content${behalfOpen ? " open" : ""}`}>
            {behalfStatus && <div className="behalf-banner">{behalfStatus}</div>}
            <p className="behalf-helper">
              Use this when someone donates via QR, cash or transfer and you want it counted under your fundraising seva.
            </p>
            <div className="behalf-grid">
              <label className={`behalf-field${behalfErrors.name ? " has-error" : ""}`}>
                <span>Donor Name</span>
                <input
                  type="text"
                  placeholder="Enter donor name"
                  value={behalfForm.name}
                  onChange={(e) => handleBehalfChange("name", e.target.value)}
                />
                {behalfErrors.name && <small>{behalfErrors.name}</small>}
              </label>
              <label className={`behalf-field${behalfErrors.phone ? " has-error" : ""}`}>
                <span>Phone Number</span>
                <div className="behalf-inline-input">
                  <span>+91</span>
                  <input
                    type="text"
                    placeholder="10-digit mobile number"
                    value={behalfForm.phone}
                    onChange={(e) =>
                      handleBehalfChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                  />
                </div>
                {behalfErrors.phone && <small>{behalfErrors.phone}</small>}
              </label>
              <label className={`behalf-field${behalfErrors.date ? " has-error" : ""}`}>
                <span>Transaction Date</span>
                <input
                  type="date"
                  value={behalfForm.date}
                  onChange={(e) => handleBehalfChange("date", e.target.value)}
                />
                {behalfErrors.date && <small>{behalfErrors.date}</small>}
              </label>
              <label className={`behalf-field${behalfErrors.amount ? " has-error" : ""}`}>
                <span>Transaction Amount (₹)</span>
                <div className="behalf-inline-input amount">
                  <span>₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount in ₹"
                    value={behalfForm.amount}
                    onChange={(e) => handleBehalfChange("amount", e.target.value)}
                  />
                </div>
                {behalfErrors.amount && <small>{behalfErrors.amount}</small>}
              </label>
              <label className={`behalf-field full${behalfErrors.mode ? " has-error" : ""}`}>
                <span>Payment Mode</span>
                <div className="behalf-select">
                  <select
                    value={behalfForm.mode}
                    onChange={(e) => handleBehalfChange("mode", e.target.value)}
                  >
                    <option value="">Select mode</option>
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="qr">QR Code</option>
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="cash">Cash</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {behalfErrors.mode && <small>{behalfErrors.mode}</small>}
              </label>
            </div>
            <div className="behalf-actions">
              <button type="button" className="ghost-reset" onClick={handleBehalfReset}>
                Clear form
              </button>
              <button type="button" className="solid-btn" onClick={handleBehalfSubmit}>
                Submit Donation Request
              </button>
            </div>
          </div>
        </section>

        <section className="donation-section">
          <div className="donation-filters">
            <div className="date-pickers">
              <label>
                <span>Start Date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleFundraisingStartChange(e.target.value)}
                />
              </label>
              <label>
                <span>End Date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleFundraisingEndChange(e.target.value)}
                />
              </label>
            </div>
            <div className="quick-filters">
              {[
                { key: "thisMonth", label: "This Month" },
                { key: "last3Months", label: "Last 3 Months" },
              ].map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  className={`quick-filter-btn${quickRange === chip.key ? " active" : ""}`}
                  onClick={() => setFundraisingRange(chip.key)}
                >
                  {chip.label}
                </button>
              ))}
              <FinancialYearDropdown
                selectedYear={selectedFY}
                onSelect={handleFundraisingFinancialYear}
              />
            </div>
          </div>

          <div className="donation-table-card">
            <div className="table-title-row">
              <div>
                <p className="section-kicker">History</p>
                <h3>Donations Through Your Fundraising Link</h3>
              </div>
            </div>
            <div className="table-scroll">
            <table className="donation-table fundraising-table">
              <thead>
                <tr>
                  <HeaderFilter
                    label="Donor Name"
                    column="donor"
                    openColumn={fundraisingFilterOpen}
                    setOpenColumn={setFundraisingFilterOpen}
                    onReset={() => resetFundraisingFilters("donor")}
                  >
                    <label className="filter-field">
                      <span>Search</span>
                      <input
                        type="text"
                        placeholder="Donor name"
                        value={fundraisingFilters.donor}
                        onChange={(e) => updateFundraisingFilters("donor", e.target.value)}
                      />
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Date of Donation"
                    column="fundDate"
                    openColumn={fundraisingFilterOpen}
                    setOpenColumn={setFundraisingFilterOpen}
                    onReset={() => resetFundraisingFilters("dateFrom", "dateTo")}
                  >
                    <label className="filter-field">
                      <span>From</span>
                      <input
                        type="date"
                        value={fundraisingFilters.dateFrom}
                        onChange={(e) => updateFundraisingFilters("dateFrom", e.target.value)}
                      />
                    </label>
                    <label className="filter-field">
                      <span>To</span>
                      <input
                        type="date"
                        value={fundraisingFilters.dateTo}
                        onChange={(e) => updateFundraisingFilters("dateTo", e.target.value)}
                      />
                    </label>
                    <div className="filter-quick">
                      <button
                        type="button"
                        className={fundraisingDatePreset === "today" ? "active" : ""}
                        onClick={() => applyFundraisingDatePreset("today")}
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        className={fundraisingDatePreset === "last7" ? "active" : ""}
                        onClick={() => applyFundraisingDatePreset("last7")}
                      >
                        Last 7 days
                      </button>
                      <button
                        type="button"
                        className={fundraisingDatePreset === "last30" ? "active" : ""}
                        onClick={() => applyFundraisingDatePreset("last30")}
                      >
                        Last 30 days
                      </button>
                      <button
                        type="button"
                        className={fundraisingDatePreset === "thisYear" ? "active" : ""}
                        onClick={() => applyFundraisingDatePreset("thisYear")}
                      >
                        This Year
                      </button>
                    </div>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Amount"
                    column="fundAmount"
                    openColumn={fundraisingFilterOpen}
                    setOpenColumn={setFundraisingFilterOpen}
                    onReset={() => resetFundraisingFilters("amountMin", "amountMax")}
                  >
                    <label className="filter-field">
                      <span>Min</span>
                      <input
                        type="number"
                        placeholder="₹"
                        value={fundraisingFilters.amountMin}
                        onChange={(e) => updateFundraisingFilters("amountMin", e.target.value)}
                      />
                    </label>
                    <label className="filter-field">
                      <span>Max</span>
                      <input
                        type="number"
                        placeholder="₹"
                        value={fundraisingFilters.amountMax}
                        onChange={(e) => updateFundraisingFilters("amountMax", e.target.value)}
                      />
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Mode"
                    column="fundMode"
                    openColumn={fundraisingFilterOpen}
                    setOpenColumn={setFundraisingFilterOpen}
                    onReset={() => resetFundraisingFilters("mode")}
                  >
                    <label className="filter-field">
                      <span>Mode</span>
                      <select
                        value={fundraisingFilters.mode}
                        onChange={(e) => updateFundraisingFilters("mode", e.target.value)}
                      >
                        <option value="all">All</option>
                        <option value="UPI">UPI</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Card">Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="UTR"
                    column="fundUTR"
                    openColumn={fundraisingFilterOpen}
                    setOpenColumn={setFundraisingFilterOpen}
                    onReset={() => resetFundraisingFilters("utr")}
                  >
                    <label className="filter-field">
                      <span>Reference</span>
                      <input
                        type="text"
                        placeholder="UTR"
                        value={fundraisingFilters.utr}
                        onChange={(e) => updateFundraisingFilters("utr", e.target.value)}
                      />
                    </label>
                  </HeaderFilter>
                </tr>
              </thead>
                <tbody>
                  {filteredFundraising.map((entry) => (
                    <tr key={`${entry.name}-${entry.utr}-${entry.date}`}>
                      <td>{entry.name}</td>
                      <td>{entry.date}</td>
                      <td>{entry.amount}</td>
                      <td>{entry.mode}</td>
                      <td>{entry.utr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function Form10BE() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedFY, setSelectedFY] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const filteredRows = form10beRows.filter((row) => {
    if (selectedFY && row.year !== selectedFY) return false;
    if (statusFilter === "available" && !row.available) return false;
    if (statusFilter === "unavailable" && row.available) return false;
    return true;
  });
  const hasFilters = Boolean(selectedFY) || statusFilter !== "all";

  return (
    <div className="dashboard">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Form 10BE</h1>
            <p className="tenbe-subtitle">
              Download your Form 10BE for each financial year. This includes all 80G-eligible donations linked to your PAN.
            </p>
          </div>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="tenbe-card">
          <div className="tenbe-filters">
            <div className="tenbe-filter-control">
              <span>Financial Year</span>
              <FinancialYearDropdown
                selectedYear={selectedFY}
                onSelect={(option) => setSelectedFY(option?.label ?? "")}
              />
            </div>
            <label>
              <span>Status</span>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Not Available</option>
              </select>
            </label>
            <button
              type="button"
              className={`tenbe-clear${hasFilters ? "" : " disabled"}`}
              disabled={!hasFilters}
              onClick={() => {
                setSelectedFY("");
                setStatusFilter("all");
              }}
            >
              Clear filters
            </button>
          </div>

          {filteredRows.length ? (
            <div className="tenbe-table-wrapper">
              <table className="tenbe-table">
                <thead>
                  <tr>
                    <th>Financial Year</th>
                    <th className="align-right">Total 80G Donations</th>
                    <th>10BE Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={row.year}>
                      <td>{row.year}</td>
                      <td className="align-right">
                        ₹{" "}
                        {row.total.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </td>
                      <td>
                        <span
                          className={`tenbe-status ${row.available ? "available" : "unavailable"}`}
                        >
                          {row.available ? "Available" : "Not Available"}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={`download-btn${row.available ? "" : " disabled"}`}
                          disabled={!row.available}
                          onClick={() => row.available && window.open(row.downloadUrl, "_blank", "noopener,noreferrer")}
                        >
                          Download 10BE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="tenbe-empty">
              <div className="empty-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor">
                  <rect x="10" y="10" width="20" height="24" rx="3" strokeWidth="1.5" />
                  <path d="M14 16h12M14 22h8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h4>No Form 10BE available yet</h4>
              <p>Once you have 80G-eligible donations and Form 10BE is issued, it will appear here for download.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function MyProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const handleProfileFieldChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };
  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="dashboard">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Profile</h1>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>
        <p className="profile-subtitle">
          Kindly update all the fields so that your receipts have all the
          necessary details.
        </p>

        <section className="profile-detail-card">
          <form className="profile-grid">
            <div className="profile-column">
              <label className="profile-field">
                <span>Name</span>
                <input
                  type="text"
                  value={user.fullName || ""}
                  onChange={(e) => handleProfileFieldChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </label>
              <label className="profile-field">
                <span>Email</span>
                <input type="email" placeholder="Enter your email address" />
              </label>
              <label className="profile-field">
                <span>Address Line 1</span>
                <input
                  type="text"
                  value={user.address1 || ""}
                  onChange={(e) => handleProfileFieldChange("address1", e.target.value)}
                  placeholder="Flat / House / Building No."
                />
              </label>
              <label className="profile-field">
                <span>City / Town</span>
                <input
                  type="text"
                  value={user.city || ""}
                  onChange={(e) => handleProfileFieldChange("city", e.target.value)}
                  placeholder="City / Town"
                />
              </label>
              <label className="profile-field">
                <span>PIN Code</span>
                <input
                  type="text"
                  value={user.pin || ""}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    if (digits.length <= 6) {
                      handleProfileFieldChange("pin", digits);
                    }
                  }}
                  placeholder="Enter PIN code"
                  maxLength={6}
                />
              </label>
              <label className="profile-field">
                <span>Date of Birth</span>
                <input type="text" placeholder="dd/mm/yyyy" />
              </label>
              <label className="profile-field">
                <span>Marital Status</span>
                <div className="select-shell">
                  <select defaultValue="single">
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                  <span aria-hidden="true">▾</span>
                </div>
              </label>
              <label className="profile-field">
                <span>Nationality</span>
                <div className="select-shell">
                  <select defaultValue="india">
                    <option value="india">India</option>
                    <option value="nri">Non-Resident Indian</option>
                    <option value="other">Other</option>
                  </select>
                  <span aria-hidden="true">▾</span>
                </div>
              </label>
            </div>

            <div className="profile-column">
              <label className="profile-field">
                <span>Phone Number</span>
                <input
                  type="tel"
                  value={user.mobileNumber || ""}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    setUser((prev) => ({ ...prev, mobileNumber: digits }));
                  }}
                  placeholder="Enter your phone number"
                />
              </label>
              <label className="profile-field">
                <span>PAN</span>
                <input
                  type="text"
                  value={user.pan || ""}
                  onChange={(e) =>
                    handleProfileFieldChange("pan", e.target.value.toUpperCase())
                  }
                  placeholder="Enter your PAN"
                  maxLength={10}
                />
              </label>
              <label className="profile-field">
                <span>Address Line 2</span>
                <input
                  type="text"
                  value={user.address2 || ""}
                  onChange={(e) => handleProfileFieldChange("address2", e.target.value)}
                  placeholder="Street / Locality / Landmark"
                />
              </label>
              <label className="profile-field">
                <span>State / Province</span>
                <input
                  type="text"
                  value={user.state || ""}
                  onChange={(e) => handleProfileFieldChange("state", e.target.value)}
                  placeholder="State / Province"
                />
              </label>
              <label className="profile-field">
                <span>Country</span>
                <div className="select-shell">
                  <select
                    value={user.country || "India"}
                    onChange={(e) => handleProfileFieldChange("country", e.target.value)}
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other</option>
                  </select>
                  <span aria-hidden="true">▾</span>
                </div>
              </label>
              <label className="profile-field">
                <span>Gender</span>
                <div className="select-shell">
                  <select defaultValue="male">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <span aria-hidden="true">▾</span>
                </div>
              </label>
              <label className="profile-field">
                <span>Initiated Name</span>
                <input type="text" placeholder="Initiated Name" />
              </label>
              <label className="profile-field">
                <span>UPI IDs</span>
                <input type="text" placeholder="yourname@bank" />
              </label>
              <label className="profile-field">
                <span>Center Associated With</span>
                <div className="select-shell">
                  <select defaultValue="">
                    <option value="" disabled>
                      Select Center
                    </option>
                    <option value="ecs">ISKCON ECS Layout</option>
                    <option value="panathur">ISKCON Panathur</option>
                    <option value="sarjapur">ISKCON Sarjapur</option>
                    <option value="kadugodi">ISKCON Kadugodi</option>
                    <option value="kammanahalli">ISKCON Kammanahalli</option>
                  </select>
                  <span aria-hidden="true">▾</span>
                </div>
              </label>
            </div>
          </form>
          <div className="profile-actions-row">
            <button type="button" className="outline-btn">
              Cancel
            </button>
            <button type="button" className="solid-btn">
              Save Changes
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function ReportMissingDonation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="dashboard">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Report a Missing Donation</h1>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>
        <p className="report-subtitle">
          If your payment was successful but not visible in My Donations, please
          provide the details below. Our team will verify and update your
          records.
        </p>

        <section className="report-card">
          <form className="report-grid">
            <div className="report-column">
              <label className="report-field">
                <span>Date of Transaction</span>
                <input type="text" placeholder="dd/mm/yyyy" />
              </label>
              <label className="report-field">
                <span>Mode of Payment</span>
                <div className="report-select">
                  <select defaultValue="">
                    <option value="" disabled>
                      Select mode
                    </option>
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="cash">Cash</option>
                    <option value="other">Other</option>
                  </select>
                  <span aria-hidden="true">▾</span>
                </div>
              </label>
              <label className="report-field file-field">
                <span>Screenshot / Proof of Payment (optional)</span>
                <div className="file-upload">
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path
                      d="M10 18v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m16 8-4 4m4-4 4 4m-4-4v14"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Upload JPG, PNG, or PDF</p>
                  <small>Drag a file or click to browse</small>
                  <input type="file" accept="image/*,.pdf" />
                </div>
              </label>
              <div className="report-actions left">
                <button type="button" className="outline-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>

            <div className="report-column">
              <label className="report-field">
                <span>Amount (₹)</span>
                <input type="text" placeholder="Enter amount in ₹" />
              </label>
              <label className="report-field">
                <span>UPI Handle / Bank Name (optional)</span>
                <input type="text" placeholder="e.g. abc@oksbi or HDFC Bank" />
              </label>
              <label className="report-field">
                <span>Additional Notes / Comments (optional)</span>
                <textarea placeholder="Any extra details that may help us trace your donation." />
              </label>
              <div className="report-actions right">
                <button type="button" className="solid-btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

function MyRequests() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [commentModal, setCommentModal] = useState({ open: false, text: "" });
  const [filterOpen, setFilterOpen] = useColumnFilterState();
  const requestFilterDefaults = {
    requestId: "",
    requestType: "all",
    dateFrom: "",
    dateTo: "",
    donationId: "",
    status: "all",
  };
  const [filters, setFilters] = useState(requestFilterDefaults);
  const [requestDatePreset, setRequestDatePreset] = useState("");
  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const openCommentModal = (request) => {
    setCommentModal({
      open: true,
      text:
        request.comment ||
        "No additional comments were provided. Please reach out to the support team for more information.",
    });
  };

  const closeCommentModal = () => setCommentModal({ open: false, text: "" });

  const updateFilters = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "dateFrom" || key === "dateTo") {
      setRequestDatePreset("");
    }
  };

  const resetFilters = (...keys) => {
    setFilters((prev) => {
      const next = { ...prev };
      keys.forEach((key) => {
        next[key] = requestFilterDefaults[key];
      });
      return next;
    });
  };

  const applyRequestDateShortcut = (range) => {
    setRequestDatePreset(range);
    const today = new Date();
    let start = new Date(today);
    let end = new Date(today);
    if (range === "last7") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    } else if (range === "last30") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
    } else if (range === "thisYear") {
      start = new Date(today.getFullYear(), 0, 1);
    }
    setFilters((prev) => ({
      ...prev,
      dateFrom: formatDateInputValue(start),
      dateTo: formatDateInputValue(end),
    }));
  };

  const filteredRequests = requestRows.filter((request) => {
    if (
      filters.requestId &&
      !request.id.toLowerCase().startsWith(filters.requestId.trim().toLowerCase())
    ) {
      return false;
    }
    if (filters.requestType !== "all") {
      if (filters.requestType === "USER" && request.source !== "USER") return false;
      if (filters.requestType === "ADMIN_BULK_UPLOAD" && request.source !== "ADMIN_BULK_UPLOAD")
        return false;
    }
    const requestDate = getDateOnly(request.requestedOn);
    const fromBoundary = filters.dateFrom ? getDateOnly(filters.dateFrom) : null;
    const toBoundary = filters.dateTo ? getDateOnly(filters.dateTo) : null;
    if (fromBoundary && requestDate && requestDate < fromBoundary) return false;
    if (toBoundary && requestDate && requestDate > toBoundary) return false;
    if (
      filters.donationId &&
      !(request.donationId || "")
        .toLowerCase()
        .includes(filters.donationId.trim().toLowerCase())
    ) {
      return false;
    }
    if (filters.status !== "all" && request.status !== filters.status) {
      return false;
    }
    return true;
  });

  return (
    <div className="dashboard">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Requests</h1>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>
        <p className="requests-subtitle">
          Track all the requests you’ve submitted.
        </p>

        <section className="requests-card">
          <table className="requests-table">
            <thead>
              <tr>
                <HeaderFilter
                  label="Request ID"
                  column="reqId"
                  openColumn={filterOpen}
                  setOpenColumn={setFilterOpen}
                  onReset={() => resetFilters("requestId")}
                >
                  <label className="filter-field">
                    <span className="filter-label">Starts with</span>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="REQ"
                      value={filters.requestId}
                      onChange={(e) => updateFilters("requestId", e.target.value)}
                    />
                  </label>
                </HeaderFilter>
                <HeaderFilter
                  label="Request Type"
                  column="reqType"
                  openColumn={filterOpen}
                  setOpenColumn={setFilterOpen}
                  onReset={() => resetFilters("requestType")}
                >
                  <label className="filter-field">
                    <span className="filter-label">Type</span>
                    <select
                      className="filter-input"
                      value={filters.requestType}
                      onChange={(e) => updateFilters("requestType", e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="USER">Missing Donation (User)</option>
                      <option value="ADMIN_BULK_UPLOAD">Missing Donation (Admin)</option>
                    </select>
                  </label>
                </HeaderFilter>
                <HeaderFilter
                  label="Requested On"
                  column="reqDate"
                  openColumn={filterOpen}
                  setOpenColumn={setFilterOpen}
                  onReset={() => resetFilters("dateFrom", "dateTo")}
                >
                  <label className="filter-field">
                    <span className="filter-label">From</span>
                    <input
                      type="date"
                      className="filter-input"
                      value={filters.dateFrom}
                      onChange={(e) => updateFilters("dateFrom", e.target.value)}
                    />
                  </label>
                  <label className="filter-field">
                    <span className="filter-label">To</span>
                    <input
                      type="date"
                      className="filter-input"
                      value={filters.dateTo}
                      onChange={(e) => updateFilters("dateTo", e.target.value)}
                    />
                  </label>
                  <div className="filter-quick">
                    <button
                      type="button"
                      className={requestDatePreset === "today" ? "active" : ""}
                      onClick={() => applyRequestDateShortcut("today")}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      className={requestDatePreset === "last7" ? "active" : ""}
                      onClick={() => applyRequestDateShortcut("last7")}
                    >
                      Last 7 days
                    </button>
                    <button
                      type="button"
                      className={requestDatePreset === "last30" ? "active" : ""}
                      onClick={() => applyRequestDateShortcut("last30")}
                    >
                      Last 30 days
                    </button>
                    <button
                      type="button"
                      className={requestDatePreset === "thisYear" ? "active" : ""}
                      onClick={() => applyRequestDateShortcut("thisYear")}
                    >
                      This Year
                    </button>
                  </div>
                </HeaderFilter>
                <HeaderFilter
                  label="Donation ID"
                  column="donationId"
                  openColumn={filterOpen}
                  setOpenColumn={setFilterOpen}
                  onReset={() => resetFilters("donationId")}
                >
                  <label className="filter-field">
                    <span className="filter-label">Donation ID</span>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="DN"
                      value={filters.donationId}
                      onChange={(e) => updateFilters("donationId", e.target.value)}
                    />
                  </label>
                </HeaderFilter>
                <HeaderFilter
                  label="Status"
                  column="status"
                  openColumn={filterOpen}
                  setOpenColumn={setFilterOpen}
                  onReset={() => resetFilters("status")}
                >
                  <label className="filter-field">
                    <span className="filter-label">Status</span>
                    <select
                      className="filter-input"
                      value={filters.status}
                      onChange={(e) => updateFilters("status", e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </label>
                </HeaderFilter>
                <HeaderFilter
                  label="Action"
                  column="action"
                  openColumn={filterOpen}
                  setOpenColumn={setFilterOpen}
                >
                  <p className="filter-hint">No filters available</p>
                </HeaderFilter>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => {
                const typeLabel =
                  request.source === "ADMIN_BULK_UPLOAD"
                    ? `${request.type} (Admin)`
                    : `${request.type} (User)`;
                const statusLabel =
                  request.status === "completed"
                    ? "Completed"
                    : request.status === "rejected"
                    ? "Rejected"
                    : "Pending";
                return (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{typeLabel}</td>
                    <td>{request.requestedOn}</td>
                    <td>{request.status === "completed" ? request.donationId : "—"}</td>
                    <td>
                      <span className={`request-status ${request.status}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td>
                      <div className="user-request-actions">
                        <button
                          type="button"
                          className="requests-action-btn"
                          onClick={() => openModal(request)}
                        >
                          View Details
                        </button>
                        {request.status === "rejected" && (
                          <button
                            type="button"
                            className="comments-btn"
                            onClick={() => openCommentModal(request)}
                          >
                            Comments
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>

      {modalOpen && selectedRequest && (
        <div className="requests-modal-backdrop">
          <div className="requests-modal">
            <header className="modal-header">
              <div>
                <h2>Request Details</h2>
                <p>Summary of your submitted request</p>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &times;
              </button>
            </header>

            <div className="modal-section">
              <p className="modal-section-title">System Details</p>
              <div className="modal-grid">
                <div>
                  <span>Request ID</span>
                  <p>{selectedRequest.id}</p>
                </div>
                <div>
                  <span>Request Type</span>
                  <p>{selectedRequest.type}</p>
                </div>
                <div>
                  <span>Requested On</span>
                  <p>{selectedRequest.requestedOn}</p>
                </div>
                <div>
                  <span>Status</span>
                  <p>{selectedRequest.status === "completed" ? "Completed" : "Pending"}</p>
                </div>
                <div>
                  <span>Donation ID</span>
                  <p>
                    {selectedRequest.status === "completed"
                      ? selectedRequest.donationId
                      : "Pending"}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <p className="modal-section-title">Donation Details Filled By You</p>
              <div className="modal-grid">
                <div>
                  <span>Date of Transaction</span>
                  <p>{selectedRequest.details.date}</p>
                </div>
                <div>
                  <span>Amount</span>
                  <p>{selectedRequest.details.amount}</p>
                </div>
                <div>
                  <span>Mode of Payment</span>
                  <p>{selectedRequest.details.mode}</p>
                </div>
                <div>
                  <span>UPI Handle / Bank Name</span>
                  <p>{selectedRequest.details.handle}</p>
                </div>
                {selectedRequest.details.screenshot && (
                  <div className="screenshot-row">
                    <span>Screenshot</span>
                    <p className="screenshot-pill">
                      {selectedRequest.details.screenshot}
                    </p>
                  </div>
                )}
                <div className="notes-row">
                  <span>Additional Notes</span>
                  <p>{selectedRequest.details.notes || "—"}</p>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="outline-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {commentModal.open && (
        <div className="comment-modal-backdrop">
          <div className="comment-modal">
            <div className="comment-modal-header">
              <h3>Reason for Rejection</h3>
              <p>Here is the note shared by our support team.</p>
            </div>
            <p className="comment-modal-body">{commentModal.text}</p>
            <div className="comment-modal-actions">
              <button type="button" onClick={closeCommentModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DonationListView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quickRange, setQuickRange] = useState("");
  const [selectedFY, setSelectedFY] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useColumnFilterState();
  const donationListFilterDefaults = {
    donationId: "",
    dateFrom: "",
    dateTo: "",
    donor: "",
    amountMin: "",
    amountMax: "",
    mode: "all",
    utr: "",
    status: "all",
  };
  const [columnFilters, setColumnFilters] = useState(donationListFilterDefaults);
  const [listDatePreset, setListDatePreset] = useState("");
  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const toDateOnly = (value) => {
    const date = new Date(value);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const syncListDates = (fromValue, toValue) => {
    setStartDate(fromValue);
    setEndDate(toValue);
    setColumnFilters((prev) => ({
      ...prev,
      dateFrom: fromValue,
      dateTo: toValue,
    }));
  };

  const handleListStartChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setStartDate(value);
    setColumnFilters((prev) => ({ ...prev, dateFrom: value }));
  };

  const handleListEndChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setEndDate(value);
    setColumnFilters((prev) => ({ ...prev, dateTo: value }));
  };

  const setRange = (range) => {
    setQuickRange(range);
    setSelectedFY("");
    const today = new Date();
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let start = new Date(end);
    if (range === "thisMonth") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (range === "last3Months") {
      start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    }
    const startValue = start.toISOString().split("T")[0];
    const endValue = end.toISOString().split("T")[0];
    syncListDates(startValue, endValue);
  };

  const handleFinancialYearSelect = (option) => {
    setSelectedFY(option.label);
    setQuickRange("");
    setListDatePreset("");
    syncListDates(option.startDate, option.endDate);
  };

  const updateColumnFilter = (key, value) => {
    setColumnFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "dateFrom" || key === "dateTo") {
      setListDatePreset("");
    }
  };

  const resetColumnFilter = (...keys) => {
    setColumnFilters((prev) => {
      const next = { ...prev };
      keys.forEach((key) => {
        next[key] = donationListFilterDefaults[key];
      });
      return next;
    });
    if (keys.includes("dateFrom") || keys.includes("dateTo")) {
      setListDatePreset("");
    }
  };

  const applyListDatePreset = (range) => {
    setListDatePreset(range);
    const today = new Date();
    let start = new Date(today);
    let end = new Date(today);
    if (range === "last7") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    } else if (range === "last30") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
    } else if (range === "thisYear") {
      start = new Date(today.getFullYear(), 0, 1);
    }
    setColumnFilters((prev) => ({
      ...prev,
      dateFrom: formatDateInputValue(start),
      dateTo: formatDateInputValue(end),
    }));
  };

  const filteredDonations = donationListRows
    .filter((row) => {
      const rowDate = toDateOnly(row.date);
      if (startDate) {
        const start = toDateOnly(startDate);
        if (rowDate < start) return false;
      }
      if (endDate) {
        const end = toDateOnly(endDate);
        if (rowDate > end) return false;
      }
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return (
        row.id.toLowerCase().includes(term) ||
        row.donor.toLowerCase().includes(term) ||
        row.utr.toLowerCase().includes(term)
      );
    })
    .filter((row) => {
      if (
        columnFilters.donationId &&
        !row.id.toLowerCase().includes(columnFilters.donationId.trim().toLowerCase())
      ) {
        return false;
      }
      const rowDate = toDateOnly(row.date);
      const fromBoundary = columnFilters.dateFrom ? getDateOnly(columnFilters.dateFrom) : null;
      const toBoundary = columnFilters.dateTo ? getDateOnly(columnFilters.dateTo) : null;
      if (fromBoundary && rowDate && rowDate < fromBoundary) return false;
      if (toBoundary && rowDate && rowDate > toBoundary) return false;
      if (
        columnFilters.donor &&
        !row.donor.toLowerCase().includes(columnFilters.donor.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        columnFilters.amountMin &&
        row.amount < Number(columnFilters.amountMin || 0)
      ) {
        return false;
      }
      if (
        columnFilters.amountMax &&
        row.amount > Number(columnFilters.amountMax || 0)
      ) {
        return false;
      }
      if (columnFilters.mode !== "all" && row.mode !== columnFilters.mode) {
        return false;
      }
      if (
        columnFilters.utr &&
        !row.utr.toLowerCase().includes(columnFilters.utr.trim().toLowerCase())
      ) {
        return false;
      }
      if (columnFilters.status !== "all" && row.status !== columnFilters.status) {
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="dashboard">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main donation-list">
        <header className="dashboard-header">
          <div>
            <h1>Donation List View</h1>
            <p className="donation-list-sub">
              View and filter all donations across all donors.
            </p>
          </div>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="admin-filter-bar">
          <div className="date-controls">
            <label className="date-field">
              <span>Start Date</span>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleListStartChange(e.target.value)}
                />
                <span aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path
                      d="M6 2v2M14 2v2M3 7h14M5 10h2m3 0h2m3 0h2M4 5h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </label>
            <label className="date-field">
              <span>End Date</span>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleListEndChange(e.target.value)}
                />
                <span aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path
                      d="M6 2v2M14 2v2M3 7h14M5 10h2m3 0h2m3 0h2M4 5h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </label>
          </div>
          <div className="quick-filters">
            {[
              { key: "thisMonth", label: "This Month" },
              { key: "last3Months", label: "Last 3 Months" },
            ].map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={`quick-filter-btn${quickRange === filter.key ? " active" : ""}`}
                onClick={() => setRange(filter.key)}
              >
                {filter.label}
              </button>
            ))}
            <FinancialYearDropdown selectedYear={selectedFY} onSelect={handleFinancialYearSelect} />
          </div>
        </section>

        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <circle cx="9" cy="9" r="6" strokeWidth="1.4" />
              <path d="m14 14 3 3" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by Donation ID, Donor Name, or UTR"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <section className="donation-table-card">
          {filteredDonations.length ? (
            <table className="admin-donation-table">
              <thead>
                <tr>
                  <HeaderFilter
                    label="Donation ID"
                    column="listDonationId"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("donationId")}
                  >
                    <label className="filter-field">
                      <span>ID</span>
                      <input
                        type="text"
                        placeholder="DN"
                        value={columnFilters.donationId}
                        onChange={(e) => updateColumnFilter("donationId", e.target.value)}
                      />
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Date of Donation"
                    column="listDate"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("dateFrom", "dateTo")}
                  >
                    <label className="filter-field">
                      <span>From</span>
                      <input
                        type="date"
                        value={columnFilters.dateFrom}
                        onChange={(e) => updateColumnFilter("dateFrom", e.target.value)}
                      />
                    </label>
                    <label className="filter-field">
                      <span>To</span>
                      <input
                        type="date"
                        value={columnFilters.dateTo}
                        onChange={(e) => updateColumnFilter("dateTo", e.target.value)}
                      />
                    </label>
                    <div className="filter-quick">
                      <button
                        type="button"
                        className={listDatePreset === "today" ? "active" : ""}
                        onClick={() => applyListDatePreset("today")}
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        className={listDatePreset === "last7" ? "active" : ""}
                        onClick={() => applyListDatePreset("last7")}
                      >
                        Last 7 days
                      </button>
                      <button
                        type="button"
                        className={listDatePreset === "last30" ? "active" : ""}
                        onClick={() => applyListDatePreset("last30")}
                      >
                        Last 30 days
                      </button>
                      <button
                        type="button"
                        className={listDatePreset === "thisYear" ? "active" : ""}
                        onClick={() => applyListDatePreset("thisYear")}
                      >
                        This Year
                      </button>
                    </div>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Donor Name"
                    column="listDonor"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("donor")}
                  >
                    <label className="filter-field">
                      <span>Name</span>
                      <input
                        type="text"
                        placeholder="Search donor"
                        value={columnFilters.donor}
                        onChange={(e) => updateColumnFilter("donor", e.target.value)}
                      />
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Amount (₹)"
                    column="listAmount"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    className="align-right"
                    onReset={() => resetColumnFilter("amountMin", "amountMax")}
                  >
                    <label className="filter-field">
                      <span>Min</span>
                      <input
                        type="number"
                        placeholder="₹"
                        value={columnFilters.amountMin}
                        onChange={(e) => updateColumnFilter("amountMin", e.target.value)}
                      />
                    </label>
                    <label className="filter-field">
                      <span>Max</span>
                      <input
                        type="number"
                        placeholder="₹"
                        value={columnFilters.amountMax}
                        onChange={(e) => updateColumnFilter("amountMax", e.target.value)}
                      />
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Mode"
                    column="listMode"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("mode")}
                  >
                    <label className="filter-field">
                      <span>Mode</span>
                      <select
                        value={columnFilters.mode}
                        onChange={(e) => updateColumnFilter("mode", e.target.value)}
                      >
                        <option value="all">All</option>
                        <option value="UPI">UPI</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Card">Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="UTR / Reference"
                    column="listUtr"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("utr")}
                  >
                    <label className="filter-field">
                      <span>Reference</span>
                      <input
                        type="text"
                        placeholder="UTR"
                        value={columnFilters.utr}
                        onChange={(e) => updateColumnFilter("utr", e.target.value)}
                      />
                    </label>
                  </HeaderFilter>
                  <HeaderFilter
                    label="Status"
                    column="listStatus"
                    openColumn={filterOpen}
                    setOpenColumn={setFilterOpen}
                    onReset={() => resetColumnFilter("status")}
                  >
                    <label className="filter-field">
                      <span>Status</span>
                      <select
                        value={columnFilters.status}
                        onChange={(e) => updateColumnFilter("status", e.target.value)}
                      >
                        <option value="all">All</option>
                        <option value="success">Success</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </label>
                  </HeaderFilter>
                  <th>Mapping Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{formatDateDisplay(row.date)}</td>
                    <td>{row.donor}</td>
                    <td className="align-right">
                      ₹{" "}
                      {row.amount.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td>{row.mode}</td>
                    <td>{row.utr}</td>
                    <td>
                      <span className={`admin-status ${row.status}`}>
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <MappingChip mapped={Boolean(row.isMapped)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="donation-empty">
              <div className="empty-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor">
                  <circle cx="20" cy="20" r="12" strokeWidth="1.5" />
                  <path
                    d="M15 20h10M15 25h6M15 15h4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h4>No donations found for the selected filters.</h4>
              <p>Try adjusting the date range or clearing the search.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function BankStatementView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quickRange, setQuickRange] = useState("");
  const [selectedFY, setSelectedFY] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const loading = false;
  const bankFilterDefaults = {
    dateFrom: "",
    dateTo: "",
    payer: "",
    amountMin: "",
    amountMax: "",
    mode: "all",
    utr: "",
    scheme: "",
    mapped: "all",
  };
  const [columnFilters, setColumnFilters] = useState(bankFilterDefaults);
  const [filterOpen, setFilterOpen] = useColumnFilterState();

  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const syncBankDates = (fromValue, toValue) => {
    setStartDate(fromValue);
    setEndDate(toValue);
    setColumnFilters((prev) => ({
      ...prev,
      dateFrom: fromValue,
      dateTo: toValue,
    }));
  };

  const handleBankStartChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setStartDate(value);
    setColumnFilters((prev) => ({ ...prev, dateFrom: value }));
  };

  const handleBankEndChange = (value) => {
    setSelectedFY("");
    setQuickRange("");
    setEndDate(value);
    setColumnFilters((prev) => ({ ...prev, dateTo: value }));
  };

  const setRange = (range) => {
    setQuickRange(range);
    setSelectedFY("");
    const today = new Date();
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let start = new Date(end);
    if (range === "thisMonth") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (range === "last3Months") {
      start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    }
    const startValue = start.toISOString().split("T")[0];
    const endValue = end.toISOString().split("T")[0];
    syncBankDates(startValue, endValue);
  };

  const handleFinancialYearSelect = (option) => {
    setSelectedFY(option.label);
    setQuickRange("");
    syncBankDates(option.startDate, option.endDate);
  };

  const toDateOnly = (value) => {
    const date = new Date(value);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const filteredStatements = bankStatementRows
    .filter((row) => {
      const rowDate = toDateOnly(row.date);
      if (startDate) {
        const start = toDateOnly(startDate);
        if (rowDate < start) return false;
      }
      if (endDate) {
        const end = toDateOnly(endDate);
        if (rowDate > end) return false;
      }
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return (
        row.date.toLowerCase().includes(term) ||
        row.payer.toLowerCase().includes(term) ||
        String(row.amount).includes(term) ||
        row.mode.toLowerCase().includes(term) ||
        (row.utr || "").toLowerCase().includes(term) ||
        (row.scheme || "").toLowerCase().includes(term)
      );
    })
    .filter((row) => {
      if (
        columnFilters.dateFrom &&
        getDateOnly(row.date) &&
        getDateOnly(row.date) < getDateOnly(columnFilters.dateFrom)
      ) {
        return false;
      }
      if (
        columnFilters.dateTo &&
        getDateOnly(row.date) &&
        getDateOnly(row.date) > getDateOnly(columnFilters.dateTo)
      ) {
        return false;
      }
      if (
        columnFilters.payer &&
        !(row.payer || "")
          .toLowerCase()
          .includes(columnFilters.payer.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        columnFilters.amountMin &&
        row.amount < Number(columnFilters.amountMin || 0)
      ) {
        return false;
      }
      if (
        columnFilters.amountMax &&
        row.amount > Number(columnFilters.amountMax || 0)
      ) {
        return false;
      }
      if (columnFilters.mode !== "all") {
        if (columnFilters.mode === "bank") {
          const bankModes = ["upi", "neft", "imps", "bank", "rtgs"];
          if (!bankModes.some((m) => row.mode.toLowerCase().includes(m))) return false;
        } else if (columnFilters.mode === "gateway") {
          const bankModes = ["upi", "neft", "imps", "bank", "rtgs"];
          if (bankModes.some((m) => row.mode.toLowerCase().includes(m))) return false;
        } else if (row.mode.toLowerCase() !== columnFilters.mode.toLowerCase()) {
          return false;
        }
      }
      if (
        columnFilters.utr &&
        !(row.utr || "")
          .toLowerCase()
          .includes(columnFilters.utr.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        columnFilters.scheme &&
        !(row.scheme || "")
          .toLowerCase()
          .includes(columnFilters.scheme.trim().toLowerCase())
      ) {
        return false;
      }
      if (columnFilters.mapped === "mapped" && !row.mapped) return false;
      if (columnFilters.mapped === "not-mapped" && row.mapped) return false;
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const renderModePill = (mode) => {
    const bankModes = ["upi", "neft", "imps", "bank", "rtgs"];
    const isBank = bankModes.some((m) => mode.toLowerCase().includes(m));
    return (
      <span className={`mode-pill ${isBank ? "bank" : "gateway"}`}>
        {mode}
      </span>
    );
  };

  const updateColumnFilter = (key, value) => {
    setColumnFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetColumnFilter = (...keys) => {
    setColumnFilters((prev) => {
      const next = { ...prev };
      keys.forEach((key) => {
        next[key] = bankFilterDefaults[key];
      });
      return next;
    });
  };

  return (
    <div className="dashboard">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Bank Statements</h1>
            <p className="bank-subtitle">
              View and reconcile all transactions imported from your bank statements.
            </p>
          </div>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="bank-page-card">
          <div className="bank-filters">
            <div className="bank-dates">
              <label className="date-field">
                <span>Start Date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleBankStartChange(e.target.value)}
                />
              </label>
              <label className="date-field">
                <span>End Date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleBankEndChange(e.target.value)}
                />
              </label>
            </div>
            <div className="filter-chip-row">
              {[
                { key: "thisMonth", label: "This Month" },
                { key: "last3Months", label: "Last 3 Months" },
              ].map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  className={`filter-chip${quickRange === chip.key ? " active" : ""}`}
                  onClick={() => setRange(chip.key)}
                >
                  {chip.label}
                </button>
              ))}
              <FinancialYearDropdown selectedYear={selectedFY} onSelect={handleFinancialYearSelect} />
            </div>
          </div>

          <div className="bank-search">
            <span aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <circle cx="9" cy="9" r="6" strokeWidth="1.4" />
                <path d="m14 14 3 3" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by date, payer, amount, mode, UTR, or scheme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bank-table-card">
            {loading ? (
              <table className="bank-table">
                <tbody>
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <tr key={`skeleton-${idx}`}>
                      {Array.from({ length: 7 }).map((__, cell) => (
                        <td key={cell}>
                          <div className="skeleton" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : filteredStatements.length ? (
              <table className="bank-table">
                <thead>
                  <tr>
                    <HeaderFilter
                      label="Date of Transaction"
                      column="bsDate"
                      openColumn={filterOpen}
                      setOpenColumn={setFilterOpen}
                      onReset={() => resetColumnFilter("dateFrom", "dateTo")}
                    >
                      <label className="filter-field">
                        <span className="filter-label">From</span>
                        <input
                          type="date"
                          className="filter-input"
                          value={columnFilters.dateFrom}
                          onChange={(e) => updateColumnFilter("dateFrom", e.target.value)}
                        />
                      </label>
                      <label className="filter-field">
                        <span className="filter-label">To</span>
                        <input
                          type="date"
                          className="filter-input"
                          value={columnFilters.dateTo}
                          onChange={(e) => updateColumnFilter("dateTo", e.target.value)}
                        />
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Payer Name"
                      column="bsPayer"
                      openColumn={filterOpen}
                      setOpenColumn={setFilterOpen}
                      onReset={() => resetColumnFilter("payer")}
                    >
                      <label className="filter-field">
                        <span className="filter-label">Contains</span>
                        <input
                          type="text"
                          className="filter-input"
                          placeholder="Name"
                          value={columnFilters.payer}
                          onChange={(e) => updateColumnFilter("payer", e.target.value)}
                        />
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Amount (₹)"
                      column="bsAmount"
                      openColumn={filterOpen}
                      setOpenColumn={setFilterOpen}
                      className="align-right"
                      onReset={() => resetColumnFilter("amountMin", "amountMax")}
                    >
                      <label className="filter-field">
                        <span className="filter-label">Min</span>
                        <input
                          type="number"
                          className="filter-input"
                          placeholder="₹"
                          value={columnFilters.amountMin}
                          onChange={(e) => updateColumnFilter("amountMin", e.target.value)}
                        />
                      </label>
                      <label className="filter-field">
                        <span className="filter-label">Max</span>
                        <input
                          type="number"
                          className="filter-input"
                          placeholder="₹"
                          value={columnFilters.amountMax}
                          onChange={(e) => updateColumnFilter("amountMax", e.target.value)}
                        />
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Payment Mode"
                      column="bsMode"
                      openColumn={filterOpen}
                      setOpenColumn={setFilterOpen}
                      onReset={() => resetColumnFilter("mode")}
                    >
                      <label className="filter-field">
                        <span className="filter-label">Mode</span>
                        <select
                          className="filter-input"
                          value={columnFilters.mode}
                          onChange={(e) => updateColumnFilter("mode", e.target.value)}
                        >
                          <option value="all">All Modes</option>
                          <option value="bank">Bank (UPI/NEFT/IMPS)</option>
                          <option value="gateway">Gateways</option>
                          <option value="UPI">UPI</option>
                          <option value="NEFT">NEFT</option>
                          <option value="IMPS">IMPS</option>
                          <option value="Razorpay">Razorpay</option>
                          <option value="Easebuzz">Easebuzz</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="UTR / Reference"
                      column="bsUtr"
                      openColumn={filterOpen}
                      setOpenColumn={setFilterOpen}
                      onReset={() => resetColumnFilter("utr")}
                    >
                      <label className="filter-field">
                        <span className="filter-label">Contains</span>
                        <input
                          type="text"
                          className="filter-input"
                          placeholder="UTR"
                          value={columnFilters.utr}
                          onChange={(e) => updateColumnFilter("utr", e.target.value)}
                        />
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Scheme"
                      column="bsScheme"
                      openColumn={filterOpen}
                      setOpenColumn={setFilterOpen}
                      onReset={() => resetColumnFilter("scheme")}
                    >
                      <label className="filter-field">
                        <span className="filter-label">Contains</span>
                        <input
                          type="text"
                          className="filter-input"
                          placeholder="Scheme"
                          value={columnFilters.scheme}
                          onChange={(e) => updateColumnFilter("scheme", e.target.value)}
                        />
                      </label>
                    </HeaderFilter>
                    <HeaderFilter
                      label="Mapping Status"
                      column="bsMapping"
                      openColumn={filterOpen}
                      setOpenColumn={setFilterOpen}
                      onReset={() => resetColumnFilter("mapped")}
                    >
                      <label className="filter-field">
                        <span className="filter-label">Status</span>
                        <select
                          className="filter-input"
                          value={columnFilters.mapped}
                          onChange={(e) => updateColumnFilter("mapped", e.target.value)}
                        >
                          <option value="all">All</option>
                          <option value="mapped">Mapped</option>
                          <option value="not-mapped">Not Mapped</option>
                        </select>
                      </label>
                    </HeaderFilter>
                  </tr>
                </thead>
                <tbody>
                  {filteredStatements.map((row) => (
                    <tr key={row.id}>
                      <td>{new Date(row.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}</td>
                      <td>{row.payer || <span className="muted-text">—</span>}</td>
                      <td className="align-right">
                        ₹ {row.amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </td>
                      <td>{renderModePill(row.mode)}</td>
                      <td className="monospace">{row.utr || <span className="muted-text">—</span>}</td>
                      <td>
                        <span className="scheme-tag">{row.scheme || "—"}</span>
                      </td>
                      <td>
                        <MappingChip mapped={row.mapped} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="bank-empty">
                <div className="empty-icon" aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor">
                    <rect x="9" y="11" width="22" height="18" rx="3" strokeWidth="1.5" />
                    <path d="M9 16h22" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="m16 23 3 3 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4>No bank transactions found for the selected period.</h4>
                <p>Try changing the date range or clearing some filters.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function BulkUpload() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewRows, setPreviewRows] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "", errors: [] });
  const [mode, setMode] = useState("single");
  const [singleForm, setSingleForm] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    pan: "",
    amount: "",
    date: "",
  });
  const [singleErrors, setSingleErrors] = useState({});

  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const downloadSample = () => {
    const headers = [
      "Name",
      "Phone Number",
      "Address",
      "PAN",
      "Donation Amount",
      "Donation Date",
    ];
    const sampleRows = [
      ["Aarav Sharma", "9876543210", "Bengaluru, India", "ABCDE1234F", "2500", "15/02/2025"],
      ["Meera Iyer", "9988776655", "Chennai, India", "GFEDC4321A", "1800", "05/02/2025"],
    ];
    const csv = [headers.join(","), ...sampleRows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bulk-upload-sample.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const parseCSV = (text) => {
    const [headerLine, ...rows] = text.trim().split(/\r?\n/);
    if (!headerLine) return [];
    const entries = rows
      .map((line) => line.split(",").map((cell) => cell.trim()))
      .filter((cells) => cells.length >= 6)
      .map((cells) => ({
        name: cells[0],
        phone: cells[1],
        address: cells[2],
        pan: cells[3],
        amount: cells[4],
        date: cells[5],
      }));
    return entries.slice(0, 5);
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      try {
        const parsed = parseCSV(text);
        setPreviewRows(parsed);
        if (!parsed.length) {
          setStatus({
            type: "error",
            message: "",
            errors: ["The file appears to be empty or incorrectly formatted."],
          });
        } else {
          setStatus({ type: null, message: "", errors: [] });
        }
      } catch (error) {
        setStatus({
          type: "error",
          message: "",
          errors: ["Unable to read the file. Please check the format."],
        });
        setPreviewRows([]);
      }
    };
    reader.readAsText(file);
  };

  const handleSingleChange = (field, value) => {
    setSingleForm((prev) => ({ ...prev, [field]: value }));
    setSingleErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateSingle = () => {
    const errs = {};
    if (!singleForm.name.trim()) errs.name = "Name is required.";
    if (!/^\d{10}$/.test(singleForm.phone.trim())) errs.phone = "Enter a valid 10-digit number.";
    if (!singleForm.address1.trim()) errs.address1 = "Address line 1 is required.";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(singleForm.pan.trim().toUpperCase()))
      errs.pan = "Enter a valid PAN.";
    if (!singleForm.amount || Number(singleForm.amount) <= 0) errs.amount = "Enter a valid amount.";
    if (!singleForm.date) errs.date = "Select a donation date.";
    setSingleErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSingleSubmit = () => {
    if (!validateSingle()) return;
    setStatus({
      type: "success",
      message: "Single receipt request submitted successfully!",
      errors: [],
    });
    setSingleForm({
      name: "",
      phone: "",
      address1: "",
      address2: "",
      pan: "",
      amount: "",
      date: "",
    });
  };

  const handleSingleReset = () => {
    setSingleForm({
      name: "",
      phone: "",
      address1: "",
      address2: "",
      pan: "",
      amount: "",
      date: "",
    });
    setSingleErrors({});
    setStatus({ type: null, message: "", errors: [] });
  };

  const onDropFile = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    setStatus({ type: null, message: "", errors: [] });
    setTimeout(() => {
      setUploading(false);
      setStatus({
        type: "success",
        message: "Your donations have been successfully uploaded.",
        errors: [],
      });
      setSelectedFile(null);
      setPreviewRows([]);
    }, 1200);
  };

  const fileInputId = "bulk-upload-input";
  const uploadDisabled = !previewRows.length || uploading;

  return (
    <div className="dashboard bulk-upload-page">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Receipt Requests</h1>
            <p className="receipt-subtitle">
              Raise receipt/80G requests via single entries or bulk CSV upload.
            </p>
          </div>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="bulk-card">
          <div className="mode-toggle">
            {[
              { key: "single", label: "Single Request" },
              { key: "bulk", label: "Bulk Upload" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`mode-tab${mode === tab.key ? " active" : ""}`}
                onClick={() => setMode(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {mode === "single" ? (
            <div className="single-request-card">
              <div className="single-form-grid">
                <label className={`single-field${singleErrors.name ? " has-error" : ""}`}>
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Enter donor name"
                    value={singleForm.name}
                    onChange={(e) => handleSingleChange("name", e.target.value)}
                  />
                  {singleErrors.name && <small>{singleErrors.name}</small>}
                </label>
                <label className={`single-field${singleErrors.phone ? " has-error" : ""}`}>
                  <span>Phone Number</span>
                  <div className="phone-input">
                    <span>+91</span>
                    <input
                      type="text"
                      placeholder="10-digit mobile number"
                      value={singleForm.phone}
                      onChange={(e) =>
                        handleSingleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                    />
                  </div>
                  {singleErrors.phone && <small>{singleErrors.phone}</small>}
                </label>
                <label className={`single-field full${singleErrors.address1 ? " has-error" : ""}`}>
                  <span>Address Line 1</span>
                  <input
                    type="text"
                    placeholder="Flat / House / Building"
                    value={singleForm.address1}
                    onChange={(e) => handleSingleChange("address1", e.target.value)}
                  />
                  {singleErrors.address1 && <small>{singleErrors.address1}</small>}
                </label>
                <label className="single-field full">
                  <span>Address Line 2</span>
                  <input
                    type="text"
                    placeholder="Street / Locality / Landmark"
                    value={singleForm.address2}
                    onChange={(e) => handleSingleChange("address2", e.target.value)}
                  />
                </label>
                <label className={`single-field${singleErrors.pan ? " has-error" : ""}`}>
                  <span>PAN</span>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={singleForm.pan}
                    onChange={(e) =>
                      handleSingleChange("pan", e.target.value.toUpperCase().slice(0, 10))
                    }
                  />
                  {singleErrors.pan && <small>{singleErrors.pan}</small>}
                </label>
                <label className={`single-field${singleErrors.amount ? " has-error" : ""}`}>
                  <span>Donation Amount (₹)</span>
                  <div className="amount-input">
                    <span>₹</span>
                    <input
                      type="number"
                      placeholder="Enter amount in ₹"
                      value={singleForm.amount}
                      onChange={(e) => handleSingleChange("amount", e.target.value)}
                    />
                  </div>
                  {singleErrors.amount && <small>{singleErrors.amount}</small>}
                </label>
                <label className={`single-field${singleErrors.date ? " has-error" : ""}`}>
                  <span>Donation Date</span>
                  <input
                    type="date"
                    value={singleForm.date}
                    onChange={(e) => handleSingleChange("date", e.target.value)}
                  />
                  {singleErrors.date && <small>{singleErrors.date}</small>}
                </label>
              </div>
              <div className="single-actions">
                <button type="button" className="ghost-reset" onClick={handleSingleReset}>
                  Reset
                </button>
                <button type="button" className="solid-btn" onClick={handleSingleSubmit}>
                  Submit Request
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bulk-section">
                <p className="bulk-step">Step 1: Download Sample CSV</p>
                <p className="bulk-note">Download the sample format and fill one row per receipt request.</p>
                <button type="button" className="bulk-download" onClick={downloadSample}>
                  <span aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path
                        d="M10 3v10m0 0 4-4m-4 4-4-4M4 17h12"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Download Sample CSV
                </button>
              </div>

              <div className="bulk-section">
                <p className="bulk-step">Step 2: Upload the Completed File</p>
                <label
                  className="bulk-dropzone"
                  htmlFor={fileInputId}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDropFile}
                >
                  <div className="drop-icon" aria-hidden="true">
                    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor">
                      <path
                        d="M18 25V11M18 11l6 6m-6-6-6 6"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="6"
                        y="5"
                        width="24"
                        height="26"
                        rx="4"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </div>
                  <p>
                    Drag & drop your CSV file here <span>or</span> click to upload
                  </p>
                  <p className="hint">Only .csv files are supported.</p>
                  <input
                    id={fileInputId}
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  />
                </label>
                {selectedFile && (
                  <p className="selected-file">Selected file: {selectedFile.name}</p>
                )}
              </div>

              {previewRows.length > 0 && (
                <div className="bulk-preview">
                  <p className="bulk-step">Preview</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>PAN</th>
                        <th>Donation Amount</th>
                        <th>Donation Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows.map((row, index) => (
                        <tr key={`${row.name}-${index}`}>
                          <td>{row.name}</td>
                          <td>{row.phone}</td>
                          <td>{row.address}</td>
                          <td>{row.pan}</td>
                          <td>{row.amount}</td>
                          <td>{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!status.errors.length && (
                    <p className="preview-note">
                      Your file looks good. Click “Upload” to add these requests.
                    </p>
                  )}
                </div>
              )}

              {status.type === "success" && (
                <div className="bulk-banner success">
                  <span aria-hidden="true">✔</span>
                  {status.message}
                </div>
              )}
              {status.errors.length > 0 && (
                <div className="bulk-banner error">
                  <p>We found issues in your file:</p>
                  <ul>
                    {status.errors.map((err, idx) => (
                      <li key={`${err}-${idx}`}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="button"
                className={`bulk-upload-btn${uploadDisabled ? " disabled" : ""}`}
                onClick={handleUpload}
                disabled={uploadDisabled}
              >
                {uploading ? "Uploading..." : "Upload Requests"}
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

function UploadBankStatements() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null); // success | error

  const handleSignOut = () => {
    setProfileMenuOpen(false);
    navigate("/");
  };

  const downloadSample = () => {
    const headers = [
      "Bank Date",
      "Payer Name",
      "Amount",
      "Payment Mode",
      "UTR/Reference",
      "Remarks",
    ];
    const sampleRows = [
      ["14/02/2025", "Aarav Sharma", "3500", "NEFT", "HDFC123456", "Vasant Panchami"],
      ["10/02/2025", "Meera Iyer", "2100", "UPI", "UPI098765", "Temple Seva"],
    ];
    const csv = [headers.join(","), ...sampleRows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bank-statement-sample.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const fileInputId = "bank-upload-input";

  const handleFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setStatus(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploading(true);
    setStatus(null);
    setTimeout(() => {
      const invalid =
        !/\.(csv|xlsx)$/i.test(selectedFile.name) ||
        selectedFile.name.toLowerCase().includes("wrong");
      setUploading(false);
      if (invalid) {
        setStatus("error");
      } else {
        setStatus("success");
        setSelectedFile(null);
      }
    }, 1000);
  };

  return (
    <div className="dashboard bank-upload-page">
      <DashboardNav currentPath={location.pathname} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Upload Bank Statements</h1>
            <p className="bank-subtitle">
              Upload your bank statement in the prescribed format to auto-match donations.
            </p>
          </div>
          <div className="profile-menu">
            <button
              type="button"
              className="profile-trigger"
              aria-label="Profile menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  <circle cx="16" cy="11" r="5" strokeWidth="1.5" />
                  <path
                    d="M7 26c1.8-4 5-6 9-6s7.2 2 9 6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <section className="bank-card">
          <div className="bank-section">
            <p className="bank-step">Step 1: Download Sample Format</p>
            <p className="bank-note">
              Use this template to prepare your bank statement file.
            </p>
            <button type="button" className="bank-download" onClick={downloadSample}>
              <span aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path
                    d="M10 3v10m0 0 4-4m-4 4-4-4M4 17h12"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Download Sample CSV
            </button>
          </div>
          <div className="bank-section">
            <p className="bank-step">Step 2: Upload Your File</p>
            <p className="bank-note">
              Drag & drop your bank statement here, or click to browse.
            </p>
            <label
              className="bank-dropzone"
              htmlFor={fileInputId}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="bank-drop-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor">
                  <path
                    d="M20 10v14m0 0 6-6m-6 6-6-6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="7"
                    y="6"
                    width="26"
                    height="28"
                    rx="5"
                    strokeWidth="1.4"
                  />
                </svg>
              </div>
              <p>
                Drag & drop your CSV/XLSX file here <span>or</span> click to upload
              </p>
              <p className="hint">Accepted formats: .csv, .xlsx</p>
              <input
                id={fileInputId}
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {selectedFile && (
              <p className="bank-file">
                <span>✔</span>
                {selectedFile.name}
              </p>
            )}
          </div>
          {status === "success" && (
            <div className="bank-banner success">
              Bank statement uploaded successfully.
            </div>
          )}
          {status === "error" && (
            <div className="bank-banner error">
              Invalid format. Please upload a file using the exact sample structure.
            </div>
          )}
          <button
            type="button"
            className={`bank-upload-btn${
              !selectedFile || uploading ? " disabled" : ""
            }`}
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </section>
      </main>
    </div>
  );
}


function App() {
  const [user, setUser] = useState({
    authMethod: "google",
    countryCode: "+91",
    mobileNumber: "",
    fullName: "",
    pan: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
    country: "India",
    isAdmin: true,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/donations" element={<MyDonationSeva />} />
          <Route path="/fundraising" element={<MyFundraisingSeva />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/report-missing" element={<ReportMissingDonation />} />
          <Route path="/requests" element={<MyRequests />} />
          <Route path={DONATION_LIST_PATH} element={<DonationListView />} />
          <Route path={BULK_UPLOAD_PATH} element={<BulkUpload />} />
          <Route path={BANK_UPLOAD_PATH} element={<UploadBankStatements />} />
          <Route path={BANK_STATEMENTS_PATH} element={<BankStatementView />} />
          <Route path={ALL_REQUESTS_PATH} element={<AllRequests />} />
          <Route path="/form-10be" element={<Form10BE />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
const bankStatementRows = [
  {
    id: "BS001",
    date: "2025-02-15",
    payer: "Aarav Menon",
    amount: 3500,
    mode: "UPI",
    utr: "UTR9088123",
    scheme: "Temple Construction",
    mapped: true,
  },
  {
    id: "BS002",
    date: "2025-02-12",
    payer: "Meera Iyer",
    amount: 2100,
    mode: "NEFT",
    utr: "HDFCNEFT23451",
    scheme: "Go Seva",
    mapped: false,
  },
  {
    id: "BS003",
    date: "2025-02-08",
    payer: "Rohit Sharma",
    amount: 4800,
    mode: "IMPS",
    utr: "IMPS002344",
    scheme: "Tulsi Seva",
    mapped: true,
  },
  {
    id: "BS004",
    date: "2025-01-28",
    payer: "Saanvi Rao",
    amount: 950,
    mode: "UPI",
    utr: "UPI209811",
    scheme: "Annadaan",
    mapped: false,
  },
  {
    id: "BS005",
    date: "2025-01-12",
    payer: "Dev Khanna",
    amount: 6900,
    mode: "Razorpay",
    utr: "RAZ1234X",
    scheme: "Festival Seva",
    mapped: true,
  },
  {
    id: "BS006",
    date: "2024-12-22",
    payer: "Ishita Menon",
    amount: 1750,
    mode: "Easebuzz",
    utr: "EZ98765",
    scheme: "Go Seva",
    mapped: true,
  },
];
