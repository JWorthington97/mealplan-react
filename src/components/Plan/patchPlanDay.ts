export default async function patchPlanDay(dayID: number, recipeID: number, userID: string) {
    // const response = 
    await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/plan`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipeID, userID, dayID}),
        }
      );
}