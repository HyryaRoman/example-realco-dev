{
  type PostInfo = {
    image: string,
    title: string,
    description: string,
    tag: string,
    date: number,
    link: string
  };

  const postTemplate = document.getElementById("post-template") as HTMLTemplateElement;

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  function createPostFromInfo(info: PostInfo): HTMLElement {
    const post = postTemplate.content.cloneNode(true) as HTMLElement;

    const slots = post.querySelectorAll("[data-source]");

    slots.forEach((e) => {
      const source = e.getAttribute("data-source") as string;
      const target = e.getAttribute("data-target") || "innerHTML";

      let value = info[source];

      if (source === 'date') {
        value = dateFormatter.format(new Date(value * 1000));
      }

      e[target] = value;
    });

    return post;
  }

  function createPosts(properties: [PostInfo]) {
    const list = document.getElementById("postList") as HTMLElement;
    properties.forEach((info) => {
      list.appendChild(createPostFromInfo(info));
    });
  }

  function responseToJson(v: Response) {
    return v.json();
  }

  function onFetchError(e: any) {
    console.error("Error:", e);
  }

  fetch('assets/samples/posts?count=3')
    .then(responseToJson)
    .then(createPosts)
    .catch(onFetchError);
}
