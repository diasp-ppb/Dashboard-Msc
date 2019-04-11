import React from "react";
import { ButtonGroup, H4, Drawer, Divider, Classes, Button } from "@blueprintjs/core";
import { THEMES, Theme, IAppState, LayerState } from "../../Interfaces";
import { Dispatch } from "redux";
import { closeDrawer, selectLayer } from "../../redux/actions/AppActions";
import { connect } from "react-redux";

interface Props {
  currentTheme: Theme,
  isOpen: boolean,
  layers: LayerState[],
  closeDrawer: Function,
  selectLayer: Function,
}

class SideMenu extends React.Component<Props> {
  renderMenuLayers() {
    return this.props.layers.map((item, index) => {
      return (
        <Button
          intent="primary"
          onClick={() => this.props.selectLayer(index)}
          icon="presentation"
          key={index}
        >
          {item.name}
        </Button>
      );
    });
  }

  render() {
    return (
      <Drawer
        className={THEMES[this.props.currentTheme]}
        icon="info-sign"
        onClose={() => this.props.closeDrawer()}
        title="Urban Menu"
        autoFocus={true}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        enforceFocus={true}
        hasBackdrop={true}
        isOpen={this.props.isOpen}
        size={Drawer.SIZE_SMALL}
        usePortal={false}
        vertical={false}
        style={{ left: 0 }}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <ButtonGroup vertical={true} fill={true}>
              <H4>Layers</H4>
              {this.renderMenuLayers()}
            </ButtonGroup>
            <Divider />
          </div>
        </div>

        <div className={Classes.DRAWER_FOOTER}>Urban Dash Footer</div>
      </Drawer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    selectLayer: (nodeId:number) => {
        dispatch(closeDrawer()),
        dispatch(selectLayer(nodeId))
    }
  };
};

const mapStateToProps = (store: IAppState) => {
  return {
      isOpen: store.isOpen,
      layers: store.layers,
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SideMenu);
