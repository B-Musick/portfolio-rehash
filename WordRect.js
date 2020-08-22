class WordRect extends Topic {
    constructor(index, topic) {
        super(index, topic);
        this.rect = document.createElement("div");
        this.createRectAssociatedWithLink();
    }

    createRectAssociatedWithLink() {
        // Create the rect associated with the link
        this.setRectangleClassAndID();

        // Add CSS styling
        this.setRectangleWidth();
        this.setRectangleVerticalLocation();

        this.addRectangleToContainer();
    }

    setRectangleClassAndID(){
        this.rect.className = "info-rect";
        this.rect.id = this.topic + "-rect";
    }

    setRectangleWidth(){
        this.rect.style.width = this.rectBaseWidth
            + (this.horizontalWordSpacingMultiplier
            * (this.topics.length - this.index)) + "%";
    }

    setRectangleVerticalLocation(){
        this.rect.style.bottom = this.topicBaseSpacingFromBottom
            + this.verticalSpacing
            * (this.index % this.topics.length) + "%";
    }

    addRectangleToContainer(){
        this.container.appendChild(this.rect); // Add to the container
    }
}