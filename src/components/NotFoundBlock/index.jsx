import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <h3>К сожалению такая страница не существует</h3>
    </div>
  );
};

export default NotFoundBlock;
