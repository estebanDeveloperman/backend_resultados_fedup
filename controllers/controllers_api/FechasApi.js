export const getMatchesByPhaseApi = async (req, res) => {
  const fechas = [];
  fechas.push({
    idfecha: 1,
    dateOrder: 1,
    letterRef: "A",
  });
  fechas.push({
    idfecha: 2,
    dateOrder: 2,
    letterRef: "A",
  });
  fechas.push({
    idfecha: 3,
    dateOrder: 3,
    letterRef: "A",
  });
  fechas.push({
    idfecha: 4,
    dateOrder: 4,
    letterRef: "A",
  });
  fechas.push({
    idfecha: 5,
    dateOrder: 5,
    letterRef: "A",
  });
  // ----------------->
  fechas.push({
    idfecha: 6,
    dateOrder: 1,
    letterRef: "B",
  });
  fechas.push({
    idfecha: 7,
    dateOrder: 2,
    letterRef: "B",
  });
  fechas.push({
    idfecha: 8,
    dateOrder: 3,
    letterRef: "B",
  });
  fechas.push({
    idfecha: 9,
    dateOrder: 4,
    letterRef: "B",
  });
  fechas.push({
    idfecha: 10,
    dateOrder: 5,
    letterRef: "B",
  });

  res.status(200).json(fechas)
};