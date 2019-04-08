import React, { Component } from "react";

import FlightForm from "../../components/FlightForm/FlightForm";
// import Navbar from "../../components/Header/Header";
import CarouselComponent from "../../components/CarouselCustom/CarouselCustom";
import { Layout, Menu, Icon } from "antd";
import Navbar from "../../components/Header/Header";
import MenuBar from "../../components/HorizontalScrollBar/ScrollBar";
const { Header, Content, Footer, Sider } = Layout;
// import { Menu, Icon } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  paddingTop: "50px"
};
class HomePage extends Component {
  state = {};

  render() {
    return (
      <div>
        <Navbar />
        <div>hello</div>
        <MenuBar />
        {/* <FlightForm /> */}
        {/* <CarouselComponent /> */}
      </div>
    );
  }
}

export default HomePage;
