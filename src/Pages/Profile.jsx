import { useState } from "react";
import { useStudent } from "../context/StudentContext.jsx";
import "./Profile.css";

function Profile() {
    const [activeTab, setActiveTab] = useState("Personal");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const {
        profileData,
        updateProfileField,
        multiSelect,
        toggleMultiSelect,
        analysisResult,
        analyzeProfile
    } = useStudent();

    const provinces = multiSelect.provinces || [];
    const studyFields = multiSelect.studyFields || [];
    const fundingSources = multiSelect.fundingSources || [];
    const skills = multiSelect.skills || [];
    const programTypes = multiSelect.programTypes || [];

    const predictionResults = analysisResult?.recommendations || [];

    // Adapters for backwards-compatible checkbox handlers
    const setProvinces = "provinces";
    const setStudyFields = "studyFields";
    const setFundingSources = "fundingSources";
    const setSkills = "skills";
    const setProgramTypes = "programTypes";

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateProfileField(name, value);
    };

    const handleCheckbox = (value, category) => {
        toggleMultiSelect(category, value);
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setAnalysisError("");
        setStatusMessage("");

        try {
            const res = await analyzeProfile();
            if (res?.source === "local") {
                setStatusMessage("Scored via Canadian immigration rules engine (Offline mode)");
            } else {
                setStatusMessage("Scored via FastAPI scoring backend");
            }
        } catch (error) {
            setAnalysisError(error.message || "Failed to analyze profile");
        } finally {
            setIsAnalyzing(false);
        }
    };

    

    return (
        <div>

            <div className="profile-page">

                <h1>Your Profile</h1>

                <p>
                    Complete your information for AI analysis
                </p>

                {/* =========================
                    PROFILE TABS
                ========================= */}

                <div className="profile-tabs">

                    <button
                        className={
                            activeTab === "Personal"
                                ? "tab active"
                                : "tab"
                        }
                        onClick={() =>
                            setActiveTab("Personal")
                        }
                    >
                        👤 Personal
                    </button>

                    <button
                        className={
                            activeTab === "Academic"
                                ? "tab active"
                                : "tab"
                        }
                        onClick={() =>
                            setActiveTab("Academic")
                        }
                    >
                        🎓 Academic
                    </button>

                    <button
                        className={
                            activeTab === "Language"
                                ? "tab active"
                                : "tab"
                        }
                        onClick={() =>
                            setActiveTab("Language")
                        }
                    >
                        文 Language
                    </button>

                    <button
                        className={
                            activeTab === "Financial"
                                ? "tab active"
                                : "tab"
                        }
                        onClick={() =>
                            setActiveTab("Financial")
                        }
                    >
                        $ Financial
                    </button>

                    <button
                        className={
                            activeTab === "Preferences"
                                ? "tab active"
                                : "tab"
                        }
                        onClick={() =>
                            setActiveTab("Preferences")
                        }
                    >
                        ⚙ Preferences
                    </button>

                    <button
                        className={
                            activeTab === "Experience"
                                ? "tab active"
                                : "tab"
                        }
                        onClick={() =>
                            setActiveTab("Experience")
                        }
                    >
                        💼 Experience
                    </button>

                </div>


                {/* =========================
                    PERSONAL
                ========================= */}

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

                        <select
                            name="nationality"
                            value={profileData.nationality}
                            onChange={handleChange}
                        >
                            <option value="">Select nationality</option>
                            <option value="Indian">Indian</option>
                            <option value="Canadian">Canadian</option>
                            <option value="American">American</option>
                            <option value="British">British</option>
                            <option value="Nigerian">Nigerian</option>
                            <option value="Filipino">Filipino</option>
                            <option value="International">International</option>
                            <option value="Other">Other</option>
                        </select>

                        {profileData.nationality === "Other" && (
                            <input
                                type="text"
                                name="nationality"
                                placeholder="Specify your nationality"
                                onChange={handleChange}
                            />
                        )}

                        {/* Show Passport section ONLY if Nationality is NOT Indian */}
                        {profileData.nationality?.trim().toLowerCase() !== "indian" && (
                            <>
                                <label>Passport Number</label>

                                <input
                                    type="text"
                                    name="passportNumber"
                                    value={profileData.passportNumber}
                                    onChange={handleChange}
                                    placeholder="Enter passport number"
                                />
                            </>
                        )}

                    </div>
                )}


                {/* =========================
                    ACADEMIC
                ========================= */}

                {activeTab === "Academic" && (

                    <div className="profile-form">

                        <label>
                            Highest Qualification
                        </label>

                        <select
                            name="highestQualification"
                            value={
                                profileData.highestQualification
                            }
                            onChange={handleChange}
                        >

                            <option value="">
                                Select education
                            </option>

                            <option value="12th">
                                12th
                            </option>

                            <option value="Diploma">
                                Diploma
                            </option>

                            <option value="Bachelor's">
                                Bachelor's
                            </option>

                            <option value="Master's">
                                Master's
                            </option>

                            <option value="PhD">
                                PhD
                            </option>

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


                        <label>
                            CGPA / Percentage
                        </label>

                        <input
                            type="number"
                            name="cgpa"
                            value={profileData.cgpa}
                            onChange={handleChange}
                            placeholder="Enter your score"
                        />


                        <label>
                            Year of Graduation
                        </label>

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


                {/* =========================
                    LANGUAGE
                ========================= */}

                {activeTab === "Language" && (

                    <div className="profile-form">

                        <p>IELTS Scores</p>


                        <label>Listening</label>

                        <input
                            type="number"
                            name="ieltsListening"
                            value={
                                profileData.ieltsListening
                            }
                            onChange={handleChange}
                            placeholder="Enter score"
                        />


                        <label>Reading</label>

                        <input
                            type="number"
                            name="ieltsReading"
                            value={
                                profileData.ieltsReading
                            }
                            onChange={handleChange}
                            placeholder="Enter score"
                        />


                        <label>Writing</label>

                        <input
                            type="number"
                            name="ieltsWriting"
                            value={
                                profileData.ieltsWriting
                            }
                            onChange={handleChange}
                            placeholder="Enter score"
                        />


                        <label>Speaking</label>

                        <input
                            type="number"
                            name="ieltsSpeaking"
                            value={
                                profileData.ieltsSpeaking
                            }
                            onChange={handleChange}
                            placeholder="Enter score"
                        />


                        <label>Overall Band</label>

                        <input
                            type="number"
                            name="ieltsOverall"
                            value={
                                profileData.ieltsOverall
                            }
                            onChange={handleChange}
                            placeholder="Enter score"
                        />

                    </div>
                )}


                {/* =========================
                    FINANCIAL
                ========================= */}

                {activeTab === "Financial" && (

                    <div className="profile-form">

                        <label>
                            Available Budget (CAD)
                        </label>

                        <input
                            type="number"
                            name="availableBudget"
                            value={
                                profileData.availableBudget
                            }
                            onChange={handleChange}
                            placeholder="Enter available funds"
                        />


                        <label>
                            Annual Family Income (CAD)
                        </label>

                        <input
                            type="number"
                            name="annualFamilyIncome"
                            value={
                                profileData.annualFamilyIncome
                            }
                            onChange={handleChange}
                            placeholder="Enter annual income"
                        />


                        <label>
                            Funding Source
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    fundingSources.includes(
                                        "Self-Funded"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Self-Funded",
                                        setFundingSources
                                    )
                                }
                            />

                            Self-Funded
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    fundingSources.includes(
                                        "Family Support"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Family Support",
                                        setFundingSources
                                    )
                                }
                            />

                            Family-support
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    fundingSources.includes(
                                        "Scholarship"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Scholarship",
                                        setFundingSources
                                    )
                                }
                            />

                            Scholarship
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    fundingSources.includes(
                                        "Education Loan"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Education Loan",
                                        setFundingSources
                                    )
                                }
                            />

                            Education Loan
                        </label>

                    </div>
                )}


                {/* =========================
                    PREFERENCES
                ========================= */}

                {activeTab === "Preferences" && (

                    <div className="profile-form">

                        <label>
                            Preferred Province
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    provinces.includes(
                                        "Ontario"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Ontario",
                                        setProvinces
                                    )
                                }
                            />

                            Ontario
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    provinces.includes(
                                        "Alberta"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Alberta",
                                        setProvinces
                                    )
                                }
                            />

                            Alberta
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    provinces.includes(
                                        "British Columbia"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "British Columbia",
                                        setProvinces
                                    )
                                }
                            />

                            British Columbia
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    provinces.includes(
                                        "Nova Scotia"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Nova Scotia",
                                        setProvinces
                                    )
                                }
                            />

                            Nova Scotia
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    provinces.includes(
                                        "Manitoba"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Manitoba",
                                        setProvinces
                                    )
                                }
                            />

                            Manitoba
                        </label>


                        <label>
                            Preferred Study Field
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    studyFields.includes(
                                        "Computer Science"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Computer Science",
                                        setStudyFields
                                    )
                                }
                            />

                            Computer Science
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    studyFields.includes(
                                        "Data Science"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Data Science",
                                        setStudyFields
                                    )
                                }
                            />

                            Data Science
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    studyFields.includes(
                                        "AI/ML"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "AI/ML",
                                        setStudyFields
                                    )
                                }
                            />

                            AI/ML
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    studyFields.includes(
                                        "CyberSecurity"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "CyberSecurity",
                                        setStudyFields
                                    )
                                }
                            />

                            CyberSecurity
                        </label>


                        <label>
                            Preferred Start Date
                        </label>

                        <input
                            type="date"
                            name="preferredStartDate"
                            value={
                                profileData.preferredStartDate
                            }
                            onChange={handleChange}
                        />


                        <label>
                            Program Type
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    programTypes.includes(
                                        "Postgraduate Diploma"
                                    )
                                }
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
                                checked={
                                    programTypes.includes(
                                        "Master's Degree"
                                    )
                                }
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


                {/* =========================
                    EXPERIENCE
                ========================= */}

                {activeTab === "Experience" && (

                    <div className="profile-form">

                        <label>
                            Total Work Experience(years)
                        </label>

                        <select
                            name="workExperience"
                            value={
                                profileData.workExperience
                            }
                            onChange={handleChange}
                        >

                            <option value="">
                                Select experience
                            </option>

                            <option value="No Experience">
                                No Experience
                            </option>

                            <option value="Less than 1 year">
                                Less than 1 year
                            </option>

                            <option value="1–2 years">
                                1–2 years
                            </option>

                            <option value="2–5 years">
                                2–5 years
                            </option>

                            <option value="5+ years">
                                5+ years
                            </option>

                        </select>


                        <label>
                            Current Job Title
                        </label>

                        <input
                            type="text"
                            name="currentJobTitle"
                            value={
                                profileData.currentJobTitle
                            }
                            onChange={handleChange}
                            placeholder="e.g. Software Developer"
                        />


                        <label>Company</label>

                        <input
                            type="text"
                            name="company"
                            value={
                                profileData.company
                            }
                            onChange={handleChange}
                            placeholder="e.g. Information Technology"
                        />


                        <label>Skills</label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    skills.includes(
                                        "Python"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Python",
                                        setSkills
                                    )
                                }
                            />

                            Python
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    skills.includes(
                                        "React"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "React",
                                        setSkills
                                    )
                                }
                            />

                            React
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    skills.includes(
                                        "Node.js"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Node.js",
                                        setSkills
                                    )
                                }
                            />

                            Node.js
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    skills.includes(
                                        "AWS"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "AWS",
                                        setSkills
                                    )
                                }
                            />

                            AWS
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                checked={
                                    skills.includes(
                                        "Machine Learning"
                                    )
                                }
                                onChange={() =>
                                    handleCheckbox(
                                        "Machine Learning",
                                        setSkills
                                    )
                                }
                            />

                            Machine Learning
                        </label>

                    </div>
                )}


                {/* =========================
                    ANALYZE BUTTON
                ========================= */}

                <button
                    className="analyze-button"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                >

                    {isAnalyzing
                        ? "Analyzing..."
                        : "Analyze My Profile"}

                </button>


                {/* =========================
                    ANALYSIS STATUS
                ========================= */}

                {isAnalyzing && (

                    <div className="analysis-status">

                        <p>
                            🤖 AI is analyzing your profile...
                        </p>

                    </div>
                )}


                {/* =========================
                    ERROR
                ========================= */}

                {analysisError && (

                    <div className="analysis-error">

                        <p>
                            {analysisError}
                        </p>

                    </div>
                )}


                {statusMessage && (
                    <div className="analysis-status" style={{ marginTop: "15px", padding: "12px", borderRadius: "10px", background: "#0e2b3e", color: "#5ce1e6" }}>
                        <p>{statusMessage}</p>
                    </div>
                )}


                {/* =========================
                    ML RESULTS
                ========================= */}

                {predictionResults.length > 0 && (

                    <div className="prediction-results">

                        <h2>
                            AI Career Recommendations
                        </h2>

                        <p>
                            Based on your profile, the
                            machine learning model generated
                            these career matches.
                        </p>


                        {predictionResults.map(
                            (result, index) => (

                                <div
                                    className="career-result-card"
                                    key={result.career}
                                >

                                    <div>

                                        <span className="career-rank">
                                            #{index + 1}
                                        </span>

                                        <strong>
                                            {result.career}
                                        </strong>

                                    </div>


                                    <span className="career-score">

                                        {result.score}%

                                    </span>

                                </div>

                            )
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}


export default Profile;