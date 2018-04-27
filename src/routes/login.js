import React from 'react';
import { connect } from 'dva';

function IndexPage() {
  return (
    <div>
     Login
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
