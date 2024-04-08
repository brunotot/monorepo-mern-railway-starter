import { ChevronRight, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Breakpoint,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Fragment } from "react";
import {
  ButtonHoverMenu,
  OriginPosition,
} from "../../../../components/ButtonHoverMenu";
import { NavItem } from "../../../../router/navigation";
import { useNavData } from "../../../../router/useNavData";

export type HorizontalNavItemProps = {
  item: NavItem;
  dropdownPosition?: OriginPosition;
};

function HorizontalNavItem({
  item,
  dropdownPosition = {
    anchorY: "bottom",
    anchorX: "left",
    transformY: "top",
    transformX: "left",
  },
}: HorizontalNavItemProps) {
  const hasChildren = "children" in item && item.children;
  const children = item?.children ?? [];

  if (hasChildren) {
    return (
      <ButtonHoverMenu
        position={dropdownPosition}
        renderButton={(hoverProps, popupState) => (
          <ListItemButton
            sx={{
              flexGrow: 0,
              backgroundColor: popupState.isOpen ? "action.hover" : undefined,
            }}
            {...hoverProps}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
            <ListItemIcon sx={{ minWidth: 0 }}>
              {dropdownPosition.anchorY === "bottom" ? (
                <ExpandMore />
              ) : (
                <ChevronRight />
              )}
            </ListItemIcon>
          </ListItemButton>
        )}
      >
        {children.map((child, index) => (
          <HorizontalNavItem
            item={child}
            key={index}
            dropdownPosition={{
              anchorX: "right",
              anchorY: "top",
              transformX: "left",
              transformY: "top",
            }}
          />
        ))}
      </ButtonHoverMenu>
    );
  }

  return (
    <ListItemButton sx={{ flexGrow: 0 }}>
      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
      <ListItemText primary={item.label} />
    </ListItemButton>
  );
}

export type HorizontalNavigationProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
};

export function HorizontalNavigation({
  backgroundColor,
  maxWidth = false,
}: HorizontalNavigationProps) {
  const navData = useNavData();

  return (
    <Box sx={{ backgroundColor }}>
      <Container maxWidth={maxWidth}>
        <List component={Stack} direction="row">
          {navData.map((item, index) => (
            <Fragment key={index}>
              <HorizontalNavItem item={item} />
            </Fragment>
          ))}
        </List>
      </Container>
    </Box>
  );
}
