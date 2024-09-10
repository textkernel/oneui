/* eslint-disable react/display-name, react/destructuring-assignment */
import React from 'react';

module.exports = (props) => <svg {...props} data-testid={props['data-testid'] || 'default-icon'} />;
