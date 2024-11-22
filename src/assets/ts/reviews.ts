{
  type ReviewInfo = {
    rating: number,
    review: string,
    icon: string,
    name: string,
    role: string
  };

  const reviewTemplate = document.getElementById("review-template") as HTMLTemplateElement;
  const reviewStarTemplate = document.getElementById("review-star-template") as HTMLTemplateElement;

  function createReviewFromInfo(info: ReviewInfo): HTMLElement {
    const review = reviewTemplate.content.cloneNode(true) as HTMLElement;

    const slots = review.querySelectorAll("[data-source]");

    slots.forEach((e) => {
      const source = e.getAttribute("data-source") as string;
      const target = e.getAttribute("data-target") || "innerHTML";

      if (source === 'rating') {
        for (let i = 0; i < info[source]; i++) {
          e.appendChild(reviewStarTemplate.content.cloneNode(true));
        }
      } else {
        let value = info[source];

        if (source === 'review') {
          value = '"' + value + '"';
        }

        e[target] = value;
      }
    });

    return review;
  }

  function createReviews(properties: [ReviewInfo]) {
    const list = document.getElementById("reviewList") as HTMLElement;
    properties.forEach((info) => {
      list.appendChild(createReviewFromInfo(info));
    });
  }

  function responseToJson(v: Response) {
    return v.json();
  }

  function onFetchError(e: any) {
    console.error("Error:", e);
  }

  fetch('assets/samples/reviews?count=3')
    .then(responseToJson)
    .then(createReviews)
    .catch(onFetchError);
}
