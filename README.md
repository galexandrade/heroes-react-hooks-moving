# Heroes
## Moving from statefull components functional components with REACT HOOKS

### Architecture
![alt text](https://i.ibb.co/HFpfZG3/Screenshot-2019-04-01-20-12-42.png)

![alt text](https://i.ibb.co/1vnSFrW/Screenshot-2019-04-01-20-14-08.png)

### Moving planning
![alt text](https://i.ibb.co/V238NRj/Screenshot-2019-04-01-20-14-35.png)

* 1 - Move `Toolbar` to function component
```javascript
const Toolbar = props => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const switchModal = () => setOpenAddModal(!openAddModal);
  const searchHeroHandler = event => props.searchHero(event.target.value);

  {...continue...}
}
```
* 2 - Move `AddHeroModal` to function component
* 3 - Move `App` to function component
* 4 - Create a custom hook `useField` to control form fields