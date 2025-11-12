import { render } from '@testing-library/react';

import NxMonorepoUi from './ui';

describe('NxMonorepoUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NxMonorepoUi />);
    expect(baseElement).toBeTruthy();
  });
});
