import { useState } from "react";

function Profile() {
    const [activeTab, setActiveTab] = useState("Personal");

    const [provinces, setProvinces] = useState([]);
    const [studyFields, setStudyFields] = useState([]);
    const [fundingSources, setFundingSources] = useState([]);
    const [skills, setSkills] = useState([]);
    const [programTypes, setProgramTypes] = useState([]);

    
    const [profileData, setProfileData] = useState({
        fullName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        nationality: "",
        passportNumber: "",

        highestQualification: "",
        fieldOfStudy: "",
        institution: "",
        cgpa: "",
        graduationYear: "",

        ieltsListening: "",
        ieltsReading: "",
        ieltsWriting: "",
        ieltsSpeaking: "",
        ieltsOverall: "",

        availableBudget: "",
        annualFamilyIncome: "",

        preferredStartDate: "",

        workExperience: "",
        currentJobTitle: "",
        company: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfileData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckbox = (value, setValues) => {
        setValues((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    
    const finalProfileData = {
        ...profileData,
        provinces,
        studyFields,
        fundingSources,
        programTypes,
        skills
    };

    const handleAnalyze = () => {
        console.log("PROFILE DATA FOR AI:", finalProfileData);
    };

    return (
        <div>
            <div className="profile-page">

                <h1>Your Profile</h1>
                <p>Complete your information for AI analysis</p>

                <div className="profile-tabs">

                    <button
                        className={activeTab === "Personal" ? "tab active" : "tab"}
                        onClick={() => setActiveTab("Personal")}
                    >
                        👤 Personal
                    </button>

                    <button
                        className={activeTab === "Academic" ? "tab active" : "tab"}
                        onClick={() => setActiveTab("Academic")}
                    >
                        🎓 Academic
                    </button>

                    <button
                        className={activeTab === "Language" ? "tab active" : "tab"}
                        onClick={() => setActiveTab("Language")}
                    >
                        文 Language
                    </button>

                    <button
                        className={activeTab === "Financial" ? "tab active" : "tab"}
                        onClick={() => setActiveTab("Financial")}
                    >
                        $ Financial
                    </button>

                    <button
                        className={activeTab === "Preferences" ? "tab active" : "tab"}
                        onClick={() => setActiveTab("Preferences")}
                    >
                        ⚙ Preferences
                    </button>

                    <button
                        className={activeTab === "Experience" ? "tab active" : "tab"}
                        onClick={() => setActiveTab("Experience")}
                    >
                        💼 Experience
                    </button>

                </div>

                {/* PERSONAL */}
                {activeTab === "Personal" && (
                    <div className="profile-form">

                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />

                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={profileData.dateOfBirth}
                            onChange={handleChange}
                        />

                        <label>Nationality</label>
                        <input
                            type="text"
                            name="nationality"
                            value={profileData.nationality}
                            onChange={handleChange}
                            placeholder="Enter your nationality"
                        />

                        <label>Passport Number</label>
                        <input
                            type="text"
                            name="passportNumber"
                            value={profileData.passportNumber}
                            onChange={handleChange}
                            placeholder="Enter passport number"
                        />

                    </div>
                )}

                {/* ACADEMIC */}
                {activeTab === "Academic" && (
                    <div className="profile-form">

                        <label>Highest Qualification</label>

                        <select
                            name="highestQualification"
                            value={profileData.highestQualification}
                            onChange={handleChange}
                        >
                            <option value="">Select education</option>
                            <option value="12th">12th</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor's">Bachelor's</option>
                            <option value="Master's">Master's</option>
                            <option value="PhD">PhD</option>
                        </select>

                        <label>Field of Study</label>
                        <input
                            type="text"
                            name="fieldOfStudy"
                            value={profileData.fieldOfStudy}
                            onChange={handleChange}
                            placeholder="e.g. B.Tech Computer Science"
                        />

                        <label>Institution</label>
                        <input
                            type="text"
                            name="institution"
                            value={profileData.institution}
                            onChange={handleChange}
                            placeholder="Enter university"
                        />

                        <label>CGPA / Percentage</label>
                        <input
                            type="number"
                            name="cgpa"
                            value={profileData.cgpa}
                            onChange={handleChange}
                            placeholder="Enter your score"
                        />

                        <label>Year of Graduation</label>
                        <input
                            type="number"
                            name="graduationYear"
                            value={profileData.graduationYear}
                            onChange={handleChange}
                            placeholder="Enter graduation year"
                            min="1950"
                            max="2150"
                        />

                    </div>
                )}

                {/* LANGUAGE */}
                {activeTab === "Language" && (
                    <div className="profile-form">

                        <p>IELTS Scores</p>

                        <label>Listening</label>
                        <input
                            type="number"
                            name="ieltsListening"
                            value={profileData.ieltsListening}
                            onChange={handleChange}
                            placeholder="Enter score"
                        />

                        <label>Reading</label>
                        <input
                            type="number"
                            name="ieltsReading"
                            value={profileData.ieltsReading}
                            onChange={handleChange}
                            placeholder="Enter score"
                        />

                        <label>Writing</label>
                        <input
                            type="number"
                            name="ieltsWriting"
                            value={profileData.ieltsWriting}
                            onChange={handleChange}
                            placeholder="Enter score"
                        />

                        <label>Speaking</label>
                        <input
                            type="number"
                            name="ieltsSpeaking"
                            value={profileData.ieltsSpeaking}
                            onChange={handleChange}
                            placeholder="Enter score"
                        />

                        <label>Overall Band</label>
                        <input
                            type="number"
                            name="ieltsOverall"
                            value={profileData.ieltsOverall}
                            onChange={handleChange}
                            placeholder="Enter score"
                        />

                    </div>
                )}

                {/* FINANCIAL */}
                {activeTab === "Financial" && (
                    <div className="profile-form">

                        <label>Available Budget (CAD)</label>
                        <input
                            type="number"
                            name="availableBudget"
                            value={profileData.availableBudget}
                            onChange={handleChange}
                            placeholder="Enter available funds"
                        />

                        <label>Annual Family Income (CAD)</label>
                        <input
                            type="number"
                            name="annualFamilyIncome"
                            value={profileData.annualFamilyIncome}
                            onChange={handleChange}
                            placeholder="Enter annual income"
                        />

                        <label>Funding Source</label>

                        <label>
                            <input
                                type="checkbox"
                                checked={fundingSources.includes("Self-Funded")}
                                onChange={() =>
                                    handleCheckbox("Self-Funded", setFundingSources)
                                }
                            />
                            Self-Funded
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={fundingSources.includes("Family Support")}
                                onChange={() =>
                                    handleCheckbox("Family Support", setFundingSources)
                                }
                            />
                            Family-support
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={fundingSources.includes("Scholarship")}
                                onChange={() =>
                                    handleCheckbox("Scholarship", setFundingSources)
                                }
                            />
                            Scholarship
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={fundingSources.includes("Education Loan")}
                                onChange={() =>
                                    handleCheckbox("Education Loan", setFundingSources)
                                }
                            />
                            Education Loan
                        </label>

                    </div>
                )}

                {/* PREFERENCES */}
                {activeTab === "Preferences" && (
                    <div className="profile-form">

                        <label>Preferred Province</label>

                        <label>
                            <input
                                type="checkbox"
                                checked={provinces.includes("Ontario")}
                                onChange={() =>
                                    handleCheckbox("Ontario", setProvinces)
                                }
                            />
                            Ontario
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={provinces.includes("Alberta")}
                                onChange={() =>
                                    handleCheckbox("Alberta", setProvinces)
                                }
                            />
                            Alberta
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={provinces.includes("British Columbia")}
                                onChange={() =>
                                    handleCheckbox("British Columbia", setProvinces)
                                }
                            />
                            British Columbia
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={provinces.includes("Nova Scotia")}
                                onChange={() =>
                                    handleCheckbox("Nova Scotia", setProvinces)
                                }
                            />
                            Nova Scotia
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={provinces.includes("Manitoba")}
                                onChange={() =>
                                    handleCheckbox("Manitoba", setProvinces)
                                }
                            />
                            Manitoba
                        </label>

                        <label>Preferred Study Field</label>

                        <label>
                            <input
                                type="checkbox"
                                checked={studyFields.includes("Computer Science")}
                                onChange={() =>
                                    handleCheckbox("Computer Science", setStudyFields)
                                }
                            />
                            Computer Science
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={studyFields.includes("Data Science")}
                                onChange={() =>
                                    handleCheckbox("Data Science", setStudyFields)
                                }
                            />
                            Data Science
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={studyFields.includes("AI/ML")}
                                onChange={() =>
                                    handleCheckbox("AI/ML", setStudyFields)
                                }
                            />
                            AI/ML
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={studyFields.includes("CyberSecurity")}
                                onChange={() =>
                                    handleCheckbox("CyberSecurity", setStudyFields)
                                }
                            />
                            CyberSecurity
                        </label>

                        <label>Preferred Start Date</label>

                        <input
                            type="date"
                            name="preferredStartDate"
                            value={profileData.preferredStartDate}
                            onChange={handleChange}
                        />

                        <label>Program Type</label>

                        <label>
                            <input
                                type="checkbox"
                                checked={programTypes.includes("Postgraduate Diploma")}
                                onChange={() =>
                                    handleCheckbox(
                                        "Postgraduate Diploma",
                                        setProgramTypes
                                    )
                                }
                            />
                            Postgraduate Diploma
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={programTypes.includes("Master's Degree")}
                                onChange={() =>
                                    handleCheckbox(
                                        "Master's Degree",
                                        setProgramTypes
                                    )
                                }
                            />
                            Master's Degree
                        </label>

                    </div>
                )}

                {/* EXPERIENCE */}
                {activeTab === "Experience" && (
                    <div className="profile-form">

                        <label>Total Work Experience(years)</label>

                        <select
                            name="workExperience"
                            value={profileData.workExperience}
                            onChange={handleChange}
                        >
                            <option value="">Select experience</option>
                            <option value="No Experience">No Experience</option>
                            <option value="Less than 1 year">
                                Less than 1 year
                            </option>
                            <option value="1–2 years">1–2 years</option>
                            <option value="2–5 years">2–5 years</option>
                            <option value="5+ years">5+ years</option>
                        </select>

                        <label>Current Job Title</label>

                        <input
                            type="text"
                            name="currentJobTitle"
                            value={profileData.currentJobTitle}
                            onChange={handleChange}
                            placeholder="e.g. Software Developer"
                        />

                        <label>Company</label>

                        <input
                            type="text"
                            name="company"
                            value={profileData.company}
                            onChange={handleChange}
                            placeholder="e.g. Information Technology"
                        />

                        <label>Skills</label>

                        <label>
                            <input
                                type="checkbox"
                                checked={skills.includes("Python")}
                                onChange={() =>
                                    handleCheckbox("Python", setSkills)
                                }
                            />
                            Python
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={skills.includes("React")}
                                onChange={() =>
                                    handleCheckbox("React", setSkills)
                                }
                            />
                            React
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={skills.includes("Node.js")}
                                onChange={() =>
                                    handleCheckbox("Node.js", setSkills)
                                }
                            />
                            Node.js
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={skills.includes("AWS")}
                                onChange={() =>
                                    handleCheckbox("AWS", setSkills)
                                }
                            />
                            AWS
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={skills.includes("Machine Learning")}
                                onChange={() =>
                                    handleCheckbox("Machine Learning", setSkills)
                                }
                            />
                            Machine Learning
                        </label>

                    </div>
                )}

                {/* AI ANALYZE BUTTON */}
                <button
                    className="analyze-button"
                    onClick={handleAnalyze}
                >
                    Analyze My Profile
                </button>

            </div>
        </div>
    );
}

export default Profile;