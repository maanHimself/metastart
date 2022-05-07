export function teamMember(id: string) {
  return (
    <div className="flex justify-center items-center">
      <img
        id={id}
        src={`/${id}.png`}
        className=" mt-10 md:h-56 h-28  m-4 "
      ></img>
    </div>
  );
}
