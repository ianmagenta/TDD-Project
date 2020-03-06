const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("The mergeCategories function", () => {
  describe("For lists", () => {
    const template = `
    <div>
      <ul>
        {{#each categories}}
          <li>{{ this }}</li>
        {{/each}}
      </ul>
    </div>
  `;
    const tagName = 'li';

    it("should return no LIs for no categories", () => {
      let categories = [];
      let result = mergeCategories(template, categories, tagName);
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<ul>');
      expect(result).to.contain('</ul>');
      expect(result).to.not.contain('<li>');
      expect(result).to.not.contain('</li>');
      expect(result).to.not.contain("<!-- Content here -->")
    });

    it("should return a single LI for one categories", () => {
      let categories = ['Fun'];
      const result = mergeCategories(template, categories, tagName);
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<ul>');
      expect(result).to.contain('</ul>');
      expect(result).to.contain('<li>Fun</li>');
      expect(result).to.not.contain("<!-- Content here -->")
    });

    it("should return an LI for each category", () => {
      let categories = ['Fun', 'Work', 'School'];
      let result = mergeCategories(template, categories, tagName);
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<ul>');
      expect(result).to.contain('</ul>');
      expect(result).to.contain('<li>Fun</li>');
      expect(result).to.contain('<li>Work</li>');
      expect(result).to.contain('<li>School</li>');
      expect(result).to.not.contain("<!-- Content here -->")
    });
  });

  describe("For selects", () => {
    const template = `
    <div>
      <select>
        {{#each categories}}
          <option>{{ this }}</option>
        {{/each}}
      </select>
    </div>
  `;

    it("should return no OPTIONs for no categories", () => {
      let categories = [];
      let result = mergeCategories(template, categories, "option");
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<select>');
      expect(result).to.contain('</select>');
      expect(result).to.not.contain('<option>');
      expect(result).to.not.contain("</option>");
      expect(result).to.not.contain("<!-- Content here -->");
    });

    it("should return a single OPTION for one categories", () => {
      let categories = ['Fun'];
      let result = mergeCategories(template, categories, "option");
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<select>');
      expect(result).to.contain('</select>');
      expect(result).to.contain('<option>Fun</option>');
      expect(result).to.not.contain("<!-- Content here -->");
    });

    it("should return an OPTION for each category", () => {
      let categories = ['Fun', 'Work', 'School'];
      let result = mergeCategories(template, categories, "option");
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<select>');
      expect(result).to.contain('</select>');
      expect(result).to.contain('<option>Fun</option>');
      expect(result).to.contain('<option>Work</option>');
      expect(result).to.contain('<option>School</option>');
      expect(result).to.not.contain("<!-- Content here -->");
    });
  });
});
