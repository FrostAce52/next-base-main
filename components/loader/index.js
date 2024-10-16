import styles from './loader.module.css'

export default function Loader() {
  return (
    <>
      <div className={styles['lds-facebook']}>
        <div />
        <div />
        <div />
      </div>
    </>
  )
}
