import { css } from 'lit-element';

export const Header = css`
  app-header {
    position: fixed !important;
    top: 0;
    margin-left: 55px;
    display: block;
    transition-timing-function: linear;
    z-index: 1;
    width: stretch;
    font-family: var(--primary-font-family);
  }

  app-toolbar {
    height: 49px !important;
  }

  app-toolbar .icon {
    width: 24px;
    height: 24px;
    z-index: 2;
  }

  .main-title {
    margin-left: 51px;
    white-space: nowrap;
  }

  app-header,
  app-toolbar {
    background-color: var(--primary-color);
    font-weight: 400;
    color: var(--header-text-color);
  }

  app-header {
    transition: margin-top 0 !important;
    transition: margin-left 0.4s ease-in-out !important;
  }

  paper-tabs {
    text-transform: uppercase;
  }

  paper-tab {
    font-family: var(--primary-font-family);
  }
`;
