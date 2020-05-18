import React, {useState} from 'react';
import {Layout, PageHeader} from 'antd';
import logo from '../logo.svg';

function Header() {
  const [headStyle] = useState({height: 'auto'});
  const {Header} = Layout;
  return (
    <Header style={headStyle}>
      <PageHeader className="site-page-header"
                  title="云端识别监控"
                  subTitle="A佳教育实时监控系统（校园版）"
                  avatar={{src: logo}}/>
    </Header>
  )
}

// class Header extends React.Component {
//   state = {
//     headStyle: {
//       height: 'auto'
//     }
//   };
//
//   render() {
//     const {headStyle} = this.state;
//     const {Header} = Layout;
//     return (
//       <Header style={headStyle}>
//         <PageHeader className="site-page-header"
//                     title="云端识别监控"
//                     subTitle="A佳教育实时监控系统（校园版）"
//                     avatar={{src: logo}}/>
//       </Header>
//     );
//   };
// }

export default Header
