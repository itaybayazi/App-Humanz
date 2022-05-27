export default function getUsersData() {
   
    return fetch("/api")
              .then((res) => res.json())
              .then((data) => {
                return (data.message);
          });

}