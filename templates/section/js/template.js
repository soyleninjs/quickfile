import {register, registered} from '@shopify/theme-sections';

const sectionId = 'section-[handleNameSection]';

class [classNameSection] {
  constructor($section) {
    this.$section = $section;
  }
}

const sectionConfig = {
  onLoad() {
    this.[camelcaseNameSection] = new [classNameSection](this.container);
  },
};

if (registered[sectionId] == null) {
  register(sectionId, sectionConfig);
}
