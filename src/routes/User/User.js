import React from 'react';
import { connect } from 'dva';
// import styles from './IndexPage.css';

function user() {
  return (
    <div>hello world!</div>
  );
}
export default connect()(user);
