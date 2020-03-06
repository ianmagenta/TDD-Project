const { expect } = require('chai');
const { mergeItems } = require('../merge-items');
describe("The mergeItems function", () => {
  const template = `
  <table>
    <tbody>
      {{#each items}}
        <tr>
          <td>{{ add @index 1 }}</td>
          <td>{{ title }}</td>
          <td>{{ category }}</td>
          <td>
            {{#if isComplete}}
            {{else}}
              <form method="POST" action="/items/{{ add @index 1 }}">
                <button class="pure-button">Complete</button>
              </form>
            {{/if}}
          </td>
        </tr>
      {{/each}}
    </tbody>
  </table>
`;
  it("should return no TRs and no TDs for no items", () => {
    const items = [];
    const result = mergeItems(template, items);
    expect(result).contains('<table>')
    expect(result).contains('</table>')
    expect(result).contains('<tbody>')
    expect(result).contains('</tbody>')
    expect(result).not.contains('<tr>')
    expect(result).not.contains('</tr>')
    expect(result).not.contains('<td>')
    expect(result).not.contains('</td>')
    expect(result).not.contains("<!-- Content here -->")
  });

  it("should return a single TR, four TDs, and a FORM for one uncompleted item", () => {
    const items = [{ title: 'Title 1', category: 'Category 1' }];
    const result = mergeItems(template, items);
    expect(result).contains('<table>')
    expect(result).contains('</table>')
    expect(result).contains('<tbody>')
    expect(result).contains('</tbody>')
    expect(result).contains('<tr>')
    expect(result).contains('</tr>')
    expect(result).contains('<td>Title 1</td>');
    expect(result).contains('<td>Category 1</td>');
    expect(result).contains(`<form method="POST" action="/items/1">`);
    expect(result).not.contains("<!-- Content here -->")
  });

  it("should return a single TR, four TDs, and no FORM for one completed item", () => {
    const items = [{ title: 'Title 1', category: 'Category 1', isComplete: true }];
    const result = mergeItems(template, items);
    expect(result).contains('<table>')
    expect(result).contains('</table>')
    expect(result).contains('<tbody>')
    expect(result).contains('</tbody>')
    expect(result).contains('<tr>')
    expect(result).contains('</tr>')
    expect(result).contains('<td>Title 1</td>');
    expect(result).contains('<td>Category 1</td>');
    expect(result).not.contains(`<form method="POST" action="/items/1">`);
    expect(result).not.contains("<!-- Content here -->")
  });

  it("should return three TRs for three items", () => {
    const items = [
      { title: 'Title 1', category: 'Category 1', isComplete: true },
      { title: 'Title 2', category: 'Category 2' },
      { title: 'Title 3', category: 'Category 3' }
    ];
    const result = mergeItems(template, items);
    expect(result).contains('<table>')
    expect(result).contains('</table>')
    expect(result).contains('<tbody>')
    expect(result).contains('</tbody>')
    expect(result).contains('<tr>')
    expect(result).contains('</tr>')
    expect(result).contains('<td>Title 1</td>');
    expect(result).contains('<td>Category 1</td>');
    expect(result).not.contains(`<form method="POST" action="/items/1">`);
    expect(result).contains('<td>Title 2</td>');
    expect(result).contains('<td>Category 2</td>');
    expect(result).contains(`<form method="POST" action="/items/2">`);
    expect(result).contains('<td>Title 3</td>');
    expect(result).contains('<td>Category 3</td>');
    expect(result).contains(`<form method="POST" action="/items/3">`);
    expect(result).not.contains("<!-- Content here -->")
  });
});
