import {
  Button,
  NavBar,
  Form,
  Field,
  CellGroup,
  Toast,
  Cell,
  Icon,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image as VanImage,
  Rate,
  List,
  Loading,
  DropdownMenu,
  DropdownItem,
  Search,
  Row,
  Col
} from 'vant'

export default app => {
  app
    .use(Button)
    .use(NavBar)
    .use(Form)
    .use(Field)
    .use(CellGroup)
    .use(Cell)
    .use(Toast)
    .use(Icon)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Swipe)
    .use(SwipeItem)
    .use(Grid)
    .use(GridItem)
    .use(VanImage)
    .use(Rate)
    .use(List)
    .use(Loading)
    .use(DropdownMenu)
    .use(DropdownItem)
    .use(Search)
    .use(Row)
    .use(Col)
}
