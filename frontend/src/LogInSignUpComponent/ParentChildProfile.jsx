
import "./ParentChildProfile.css";
const ParentChildProfile = () => {

   return (
      <div>
         <h1>Parent Information</h1>
         <div className="parentchilddivider">
            <div className="parentchildimg">
               <img src="../img/parent-child-relation" alt="Avatar" className="imgSetting" />
            </div>
            <div>
               <div className="container">
                  <form className="form">
                     <div className="input-field">
                        <input
                           required
                           autoComplete="off"
                           type="text"
                           name="username"
                           id="username"
                        />
                        <label htmlFor="username">Full Name</label>
                     </div>
                     <div className="input-field">
                        <input
                           required
                           autoComplete="off"
                           type="email"
                           name="email"
                           id="email"
                        />
                        <label htmlFor="email">Email</label>
                     </div>
                     <div className="input-field">
                        <input
                           required
                           autoComplete="off"
                           type="password"
                           name="password"
                           id="password"
                        />
                        <label htmlFor="password">Password</label>
                     </div>
                  </form>
               </div>
            </div>
         </div>

      </div>
   );

}

export default ParentChildProfile;