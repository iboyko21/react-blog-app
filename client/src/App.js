import './App.css';

function App() {
  return (
    <main>
      <header>
        <a href="" className="logo">My Blog</a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>

      <div className="post">
        <div className="image">
          <img src="https://techcrunch.com/wp-content/uploads/2022/12/lawnmower-Large.jpeg?w=1390&crop1" alt="" />
        </div>
        <div className="text">
          <h2>Full-house battery backup comming later this year</h2>
          <p className="info">
            <a className="author">Igor Boyko</a>
            <time>2023-01-06 16:45</time>
          </p>
          <p>Today at its special launch event, home backup power giant EcoFlow launched a flurry of new products, including a “Whole-Home Backup Power Solution.”</p>
        </div>
      </div>

      <div className="post">
        <div className="image">
          <img src="https://techcrunch.com/wp-content/uploads/2022/12/lawnmower-Large.jpeg?w=1390&crop1" alt="" />
        </div>
        <div className="text">
          <h2>Full-house battery backup comming later this year</h2>
          <p>Today at its special launch event, home backup power giant EcoFlow launched a flurry of new products, including a “Whole-Home Backup Power Solution.”</p>
        </div>
      </div>

      <div className="post">
        <div className="image">
          <img src="https://techcrunch.com/wp-content/uploads/2022/12/lawnmower-Large.jpeg?w=1390&crop1" alt="" />
        </div>
        <div className="text">
          <h2>Full-house battery backup comming later this year</h2>
          <p>Today at its special launch event, home backup power giant EcoFlow launched a flurry of new products, including a “Whole-Home Backup Power Solution.”</p>
        </div>
      </div>

    </main>
  );
}

export default App;