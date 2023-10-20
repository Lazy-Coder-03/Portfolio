// Fetch and display GitHub projects
const githubProjects = document.getElementById("github-projects");

// Fetch project data from the JSON file (projects.json)
fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
        projects.forEach((project) => {
            const projectCard = createProjectCard(project);
            githubProjects.appendChild(projectCard);
        });
    })
    .catch((error) => {
        console.error("Error fetching project data:", error);
    });

function createProjectCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");

    const title = document.createElement("h3");
    title.textContent = project.name;

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("project-description");
    descriptionDiv.textContent = project.description;
    descriptionDiv.style.display = "none"; // Initially hidden

    // Add event listeners to toggle the description visibility on hover
    card.addEventListener("mouseenter", () => {
        descriptionDiv.style.display = "block";
    });

    card.addEventListener("mouseleave", () => {
        descriptionDiv.style.display = "none";
    });

    const githubLink = createLink("GitHub Repo", project.githubLink);
    const visitLink = createLink("Visit Project", project.visitLink);

    const image = createImg(project.imageURL, project.name);

    card.appendChild(title);
    card.appendChild(descriptionDiv);
    card.appendChild(githubLink);
    card.appendChild(visitLink);
    card.appendChild(image);

    return card;
}

function createLink(text, link) {
    const anchor = document.createElement("a");
    anchor.textContent = text;
    anchor.href = link;
    anchor.target = "_blank";
    return anchor;
}

function createImg(imageURL, altText) {
    const image = document.createElement("img");
    image.src = imageURL;
    image.alt = altText;
    return image;
}

// Fetch and display Blender animations
const blenderAnimations = document.getElementById("blender-animations");

// Fetch video data from the JSON file (blender.json)
fetch("blender.json")
    .then((response) => response.json())
    .then((videos) => {
        videos.forEach((video) => {
            const videoElement = createVideoElement(video);
            blenderAnimations.appendChild(videoElement);

            // Add event listeners to control video playback on hover
            videoElement.addEventListener("mouseenter", () => {
                const videoPlayer = videoElement.querySelector("video");
                videoPlayer.play();
                videoPlayer.loop = true; // Enable looping
            });

            videoElement.addEventListener("mouseleave", () => {
                const videoPlayer = videoElement.querySelector("video");
                videoPlayer.pause();
                videoPlayer.currentTime = 0; // Reset to the beginning
            });
        });
    })
    .catch((error) => {
        console.error("Error fetching video data:", error);
    });

function createVideoElement(video) {
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-container");

    const videoTitle = document.createElement("h3");
    videoTitle.textContent = video.name;

    const videoPlayer = document.createElement("video");
    videoPlayer.controls = true;
    videoPlayer.width = 480;
    videoPlayer.height = 270;

    const videoSource = document.createElement("source");
    videoSource.src = video.videoSource;
    videoSource.type = "video/mp4";

    const fallbackText = document.createElement("p");
    fallbackText.textContent = "Your browser does not support the video tag.";

    videoPlayer.appendChild(videoSource);
    videoPlayer.appendChild(fallbackText);

    videoContainer.appendChild(videoTitle);
    videoContainer.appendChild(videoPlayer);

    return videoContainer;
}
