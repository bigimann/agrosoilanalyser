fetch("https://generativelanguage.googleapis.com")
  .then((res) => console.log("Fetch OK:", res.status))
  .catch((err) => console.error("Fetch failed:", err));
