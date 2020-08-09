let topicsContainer = document.getElementById("topic-links-container");

let topHalf = document.getElementById("top");
let nameIcon = document.getElementById("name-icon");
let titleIcon = document.getElementById("title-icon");

let currentTopicTitleContainer = document.getElementById("current-topic-title");

/********************** PRINT TOPICS **************************/
let topics = ["about","courses","technology","learning","projects"];

// Spacing
let topicBaseSpacing = 14; // Represents percent
let verticalSpacing = 6;
let rectBaseWidth = 12;

topics.forEach((topic,index)=>{
    // Loop through the topics and add a rect and associated topic name

    // Create the rect associated with the link
    let rect = document.createElement("div");
    rect.className = "info-rect";
    rect.id = topic+"-rect";

    // Add CSS styling
    rect.style.width = rectBaseWidth+"%";
    rect.style.bottom = topicBaseSpacing+verticalSpacing*(index%topics.length)+"%";

    topicsContainer.appendChild(rect); // Add to the container

    // Create the link associated with the rect
    let link = document.createElement("a");
    let linkTopic = document.createElement("div");

    // Add class name to link name
    linkTopic.className = "topic-link";
    linkTopic.id = topic+"-link";

    linkTopic.style.bottom = topicBaseSpacing + verticalSpacing * (index % topics.length) + "%";
    linkTopic.innerHTML = topic.toUpperCase();
    link.appendChild(linkTopic);

    topicsContainer.appendChild(link); // Add to the container
})

// This needs to be after topic creating since .topic-link wont exist till JS creates them
let topicLinks = document.querySelectorAll(".topic-link");
let topicLinksRects = document.querySelectorAll(".info-rect");

/********************** CLICK TOPIC LOGIC **************************/
topicLinks.forEach(link=>{
    let linkName = link.id.split('-')[0];
    // let topRetractSizeId = linkName +"-retract-top-size";

    link.addEventListener("click",e=>{
        // Add name to current topic as the title in top left corner 
        currentTopicTitleContainer.textContent = linkName.toUpperCase();

        // Animation set so current title is moved to the title location
        currentTopicTitleContainer.classList.add("set-current-topic-title-top-left");

        topHalf.classList.add("top-retract-animation");

        // Remove rectangle of clicked link
        let linkRect = document.getElementById(linkName + "-rect");
        linkRect.classList.add("rect-remove");

        nameIcon.classList.add("remove-titles-animation");
        titleIcon.classList.add("remove-titles-animation");

        nameIcon.classList.add("name-icon-animation");
        titleIcon.classList.add("title-icon-animation");

        link.classList.add("topic-link-remove-animation");

        labelNotClicked(topicLinks,e.target.id);
        
    });

    link.addEventListener("mouseover",e=>{
        let linkHovered = document.getElementById(e.target.id);
        linkHovered.style.color = "yellow";

        labelNotHovered(topicLinks,e.target.id)
    })

    link.addEventListener("mouseout", e => {
        returnLablesToNormal(topicLinks, e.target.id)
    })
});


let labelNotClicked = (labelValues,clicked) => {
    /* Called when label clicked, if not the label which is clicked, then fold
    it in */
    labelValues.forEach(topic=>{

        if(topic.id!=clicked){
            topic.classList.add("label-folded");

            let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
            rect.classList.add("rect-folded");
        }
    });
}

let labelNotHovered = (labelValues,clicked)=>{
    labelValues.forEach(topic => {

        if (topic.id != clicked) {
            topic.classList.add("label-folded");

            let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
            rect.classList.add("rect-folded");
        }
    });
}

let returnLablesToNormal = (labelValues)=>{
    labelValues.forEach(topic => {
       
            topic.classList.remove("label-folded");
            topic.style.color = "rgb(72, 72, 66)"; // Return color to grey

            let rect = document.getElementById(topic.id.split("-")[0] + "-rect");
            rect.classList.remove("rect-folded");
        
    });
}