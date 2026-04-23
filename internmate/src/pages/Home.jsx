import { Briefcase, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Detecting...");
  const [internships, setInternships] = useState([]);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
  });

  // 📡 Fetch data
  useEffect(() => {
    fetch("https://internmate-swes.onrender.com")
      .then((res) => res.json())
      .then((data) => setInternships(data))
      .catch((err) => console.error(err));
  }, []);

  // 📍 Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          const data = await res.json();

          setLocation(data.city || "Your Area");
        } catch {
          setLocation("Unknown");
        }
      },
      () => setLocation("Unknown")
    );
  }, []);

  // ➕ Add Internship
  const handleAdd = () => {
    if (!newJob.title || !newJob.company || !newJob.location) {
      alert("Fill all fields");
      return;
    }

    fetch("http://localhost:3000/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        setInternships([...internships, data]);
        setNewJob({ title: "", company: "", location: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      
      <Navbar />

      {/* HERO */}
      <div className="text-center py-24 px-6 relative overflow-hidden">
        
        {/* glow */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

        <h1 className="text-6xl font-extrabold leading-tight">
          Find Internships{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Near You
          </span>
        </h1>

        <p className="text-slate-400 mt-6 text-lg">
          Discover opportunities built for students.
        </p>

        {/* SEARCH */}
        <div className="flex justify-center mt-10">
          <input
            type="text"
            placeholder="Search internships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* LOCATION */}
        <div className="flex justify-center mt-5">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm backdrop-blur-md">
            📍 {location}
          </div>
        </div>
      </div>

      {/* ➕ POST FORM */}
      <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 mb-14">
        <h2 className="text-xl font-semibold mb-4">Post Internship</h2>

        <input
          type="text"
          placeholder="Title"
          value={newJob.title}
          onChange={(e) =>
            setNewJob({ ...newJob, title: e.target.value })
          }
          className="w-full mb-3 px-4 py-2 rounded-lg bg-black/30 border border-white/10"
        />

        <input
          type="text"
          placeholder="Company"
          value={newJob.company}
          onChange={(e) =>
            setNewJob({ ...newJob, company: e.target.value })
          }
          className="w-full mb-3 px-4 py-2 rounded-lg bg-black/30 border border-white/10"
        />

        <input
          type="text"
          placeholder="Location"
          value={newJob.location}
          onChange={(e) =>
            setNewJob({ ...newJob, location: e.target.value })
          }
          className="w-full mb-3 px-4 py-2 rounded-lg bg-black/30 border border-white/10"
        />

        <button
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-2 rounded-xl hover:opacity-90 transition"
        >
          Add Internship
        </button>
      </div>

      {/* 💼 CARDS */}
      <div className="grid md:grid-cols-3 gap-8 px-10 pb-20">
        {internships.length === 0 ? (
          <p className="text-center col-span-3 text-gray-400">
            No internships found
          </p>
        ) : (
          internships
            .filter((job) =>
              job.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((job) => (
              <div
                key={job.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:scale-105 hover:border-blue-500/40 transition duration-300 shadow-xl group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase
                    className="text-blue-400 group-hover:scale-110 transition"
                    size={18}
                  />
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                </div>

                <p className="flex items-center gap-1 text-sm text-slate-400">
                  <MapPin size={16} />
                  {job.company} • {job.location}
                </p>

                <p className="text-sm mt-3 text-slate-300">
                  Work on real-world projects and gain experience.
                </p>

                <button className="mt-5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-2 rounded-xl hover:opacity-90 transition">
                  Apply
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Home;
