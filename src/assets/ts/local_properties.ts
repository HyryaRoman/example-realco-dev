{
  type PropertyInfo = {
    image: string,
    title: string,
    price: number,
    location: string,
    bedroom_count: number,
    bathroom_count: number,
    area: number
  };

  const formatter = new Intl.NumberFormat(undefined, {
    style: 'decimal',
    currency: 'USD',
    signDisplay: 'never',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const propertyCardTemplate = document.getElementById("property-card-template") as HTMLTemplateElement;

  function createCardFromInfo(info: PropertyInfo): HTMLElement {
    const card = propertyCardTemplate.content.cloneNode(true) as HTMLElement;

    const slots = card.querySelectorAll("[data-source]");

    slots.forEach((e) => {
      const source = e.getAttribute("data-source") as string;
      const target = e.getAttribute("data-target") || "innerHTML";

      let value = info[source];

      // Format price according to user locale
      if (source === "price") {
        value = formatter.format(value);
      }

      e[target] = value;
    });

    return card;
  }

  function createCards(properties: [PropertyInfo]) {
    const list = document.getElementById("propertiesList") as HTMLElement;
    properties.forEach((info) => {
      list.appendChild(createCardFromInfo(info));
    });
  }

  function responseToJson(v: Response) {
    return v.json();
  }

  function onFetchError(e: any) {
    console.error("Error:", e);
  }

  fetch('assets/samples/local_properties?count=6')
    .then(responseToJson)
    .then(createCards)
    .catch(onFetchError);
}
