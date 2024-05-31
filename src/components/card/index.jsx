function Card(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
    className={`!z-5 relative flex flex-col rounded-[20px] bg-gradient-to-r from-purple-400 to-gold-500 bg-clip-border shadow-3xl shadow-shadow-500 dark:bg-gradient-to-br dark:from-navy-800 dark:to-navy-900 dark:text-white dark:shadow-none ${extra}`}

      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
