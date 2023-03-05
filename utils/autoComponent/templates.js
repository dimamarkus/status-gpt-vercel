const { toTitleCase } = require('./utils');

const ReactComponentTemplate = (name) =>
  `import React from 'react';
import styles from './${name}.module.scss';

type ${name}Props = {
  children?: React.ReactNode;
};

const ${name} = (props: ${name}Props) => {
  const { children = 'My new component' } = props;
  const innerChild = <div>{children}</div>;

  return (
    <div className={styles.${toTitleCase(name)} + " " + "flex"}>
      {innerChild}
    </div>
  )
};
export default ${name};`;

const SassTemplate = (name) =>
  `.root {
}`;

const CypressTemplate = (name) =>
  `import React from 'react';
import ${name} from './${name}';

describe('<${name} />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<${name} />);
    cy.get('[class^=${toTitleCase(name)}_]').should('exist');
  });
});
`;

// const TestTemplate = (name) =>
//     `// TODO: TDD
//   import { shallow, render } from 'enzyme';
//   import renderer from 'react-test-renderer';
//   import React from 'react';
//   import ${name} from '.';
//   const component = <${name} />;
//   describe('The ${name} component', () => {
//     it('renders correctly', () => {
//       const wrapper = render(component);
//       expect(wrapper.hasClass('${name.toLowerCase()}')).toBeTruthy();
//       const tree = renderer.create(component).toJSON();
//       expect(tree).toMatchSnapshot();
//     });
//   });`

const StoryTemplate = (name, folder = 'UI') =>
  `import type { Meta, StoryObj } from '@storybook/react';

import ${name} from './${name}';

const meta: Meta<typeof ${name}> = {
  component: ${name},
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {

  },
};
`;

module.exports.templates = {
  index: ReactComponentTemplate,
  test: CypressTemplate,
  sass: SassTemplate,
  story: StoryTemplate,
};
