import * as Enzyme from "enzyme";
import { mount } from "enzyme";
import { ContactList } from "../../src/components/ContactList";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Contact list functionality", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Should render no contacts in initial state", () => {
    const contactList = mount(<ContactList />);
    expect(contactList.find(".contact")).toHaveLength(0);
  });

  it("Should render a specific contact when button is pressed", (done) => {
    const contactList = mount(<ContactList />);
    const name = "david";
    const phone = "123456789";

    contactList
      .find('[data-id="input-name"]')
      .simulate("change", { target: { value: name } });
    contactList
      .find('[data-id="input-phone"]')
      .simulate("change", { target: { value: phone } });
    contactList.find("button").simulate("click");

    setImmediate(() => {
      expect(contactList.find(".contact")).toHaveLength(1);
      expect(
        contactList.find(".contact").first().find('[data-id="name"]').text()
      ).toBe(name);
      expect(
        contactList.find(".contact").first().find('[data-id="phone"]').text()
      ).toBe(phone);
      done();
    });
  });

  it("Should save new added contact", (done) => {
    const contactList = mount(<ContactList />);
    const name = "david";
    const phone = "123456789";

    contactList
      .find('[data-id="input-name"]')
      .simulate("change", { target: { value: name } });
    contactList
      .find('[data-id="input-phone"]')
      .simulate("change", { target: { value: phone } });
    contactList.find("button").simulate("click");

    setImmediate(() => {
      expect(localStorage.getItem("contacts")).toBe(
        JSON.stringify([{ phone, name, isFavorite: false }])
      );

      expect(JSON.parse(localStorage.getItem("contacts"))).toEqual(
        expect.arrayContaining([expect.objectContaining({ name })])
      );
      expect(JSON.parse(localStorage.getItem("contacts")))
        .toMatchInlineSnapshot(`
        Array [
          Object {
            "isFavorite": false,
            "name": "david",
            "phone": "123456789",
          },
        ]
      `);

      done();
    });
  });

  it("Should load contacts from localstorage", () => {
    const name = "tirateUnPaso";
    const phone = "3141592";

    localStorage.setItem("contacts", JSON.stringify([{ phone, name }]));

    const contactList = mount(<ContactList />);

    expect(contactList.find(".contact")).toHaveLength(1);
    expect(
      contactList.find(".contact").first().find('[data-id="name"]').text()
    ).toBe(name);
    expect(
      contactList.find(".contact").first().find('[data-id="phone"]').text()
    ).toBe(phone);
  });
});
