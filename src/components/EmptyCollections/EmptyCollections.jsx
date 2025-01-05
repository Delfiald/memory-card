import styles from "./emptyCollections.module.css";

function EmptyCollections() {
 return (
  <div className={styles["empty-collections"]}>
   <div className={styles["empty-img"]}>
    <img src="pokeball/pokeball.svg" alt="empty image" />
   </div>
   <div className={styles["empty-text"]}>
    {`Gotta catch 'em all—but first, catch your first Pokémon!`}
   </div>
  </div>
 );
}

export default EmptyCollections;
