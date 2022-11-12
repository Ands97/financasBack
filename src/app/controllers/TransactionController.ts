import { Request, Response } from "express";
import Transaction from "../../models/TransactionModel";

export const create = async (req: Request, res: Response) => {
  try {
    const {
      type,
      description,
      value,
      date,
      paymentDate,
      Tstatus,
      category,
      account,
      acountDestination,
    } = req.body;

    if (type === "transfer") {
      const transactionIncome = await Transaction.create({
        transactionType: "income",
        transactionDescription: description,
        transactionValue: value,
        transactionDate: date,
        transactionPaymentDate: paymentDate,
        transactionStatus: Tstatus,
        transactionCategory: category,
        transactionAccount: acountDestination,
        userId: req.userId,
      });
      const transactionExpense = await Transaction.create({
        transactionType: "expense",
        transactionDescription: description,
        transactionValue: value,
        transactionDate: date,
        transactionPaymentDate: paymentDate,
        transactionStatus: Tstatus,
        transactionCategory: category,
        transactionAccount: account,
        userId: req.userId,
      });
      res.status(201).json({ transactionIncome, transactionExpense });
    } else {
      const newTransaction = await Transaction.create({
        transactionType: type,
        transactionDescription: description,
        transactionValue: value,
        transactionDate: date,
        transactionPaymentDate: paymentDate,
        transactionStatus: Tstatus,
        transactionCategory: category,
        transactionAccount: account,
        userId: req.userId,
      });
      res.status(201).json({ newTransaction });
    }
  } catch (error) {
    res.status(403).send(error);
  }
};

export const getStatementResume = async (req: Request, res: Response) => {
  try {
    const list = await Transaction.find({
      userId: req.userId,
      transactionStatus: true,
    })
      .limit(5)
      .sort({ transactionPaymentDate: -1 });
    res.json(list);
  } catch (err) {
    res.status(404);
  }
};

export const getIcome = async (req: Request, res: Response) => {
  try {
    const list = await Transaction.find({
      userId: req.userId,
      transactionStatus: true,
      transactionType: "income",
    });
    const secondList = await Transaction.find({
      userId: req.userId,
      transactionStatus: true,
      transactionType: "income",
      transactionCategory: "transfer",
    });
    if (secondList[0]) {
      let income = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      let transferIncome = secondList
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      let result = income - transferIncome;
      res.json(result);
    } else {
      const income = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      res.json(income);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const list = await Transaction.find({
      userId: req.userId,
      transactionStatus: true,
      transactionType: "expense",
    });
    const secondList = await Transaction.find({
      userId: req.userId,
      transactionStatus: true,
      transactionType: "expense",
      transactionCategory: "transfer",
    });
    if (secondList[0]) {
      let expense = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      let transferExpense = secondList
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      let result = expense - transferExpense;
      res.json(result);
    } else {
      let expense = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      res.json(expense);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getStatementForMonth = async (req: Request, res: Response) => {
  const date = req.body.date;
  const firstDate = `${date}-01`;
  const lastDate = `${date}-31`;
  const { account, category } = req.body;

  if (category === "Todas as Categorias" && account !== "Todas as Contas") {
    if (date && account) {
      try {
        const statementForMonth = await Transaction.find({
          userId: req.userId,
          transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
          transactionAccount: account,
          transactionStatus: true,
        }).sort({ transactionPaymentDate: -1 });
        res.json(statementForMonth);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  } else if (
    account === "Todas as Contas" &&
    category !== "Todas as Categorias"
  ) {
    if (date && category) {
      try {
        const statementForMonth = await Transaction.find({
          userId: req.userId,
          transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
          transactionCategory: category,
          transactionStatus: true,
        }).sort({ transactionPaymentDate: -1 });
        res.json(statementForMonth);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  } else if (
    account === "Todas as Contas" &&
    category === "Todas as Categorias"
  ) {
    try {
      const statementForMonth = await Transaction.find({
        userId: req.userId,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionStatus: true,
      }).sort({ transactionPaymentDate: -1 });
      res.json(statementForMonth);
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    try {
      const statementForMonth = await Transaction.find({
        useId: req.userId,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionAccount: account,
        transactionCategory: category,
        transactionStatus: true,
      }).sort({ transactionPaymentDate: -1 });
      res.json(statementForMonth);
    } catch (error) {
      res.status(404).json(error);
    }
  }
};

export const getIncomeForMonth = async (req: Request, res: Response) => {
  const date = req.body.date;
  const firstDate = `${date}-01`;
  const lastDate = `${date}-31`;
  const { account, category } = req.body;
  if (category === "Todas as Categorias" && account !== "Todas as Contas") {
    try {
      const list = await Transaction.find({
        userId: req.userId,
        transactionStatus: true,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionType: "income",
        transactionAccount: account,
      });

      const income = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      if (income) {
        res.json(income);
      } else {
        res.json(0);
      }
    } catch (error) {
      res.json(0);
    }
  } else if (
    account === "Todas as Contas" &&
    category !== "Todas as Categorias"
  ) {
    try {
      const list = await Transaction.find({
        userId: req.userId,
        transactionStatus: true,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionType: "income",
        transactionCategory: category,
      });

      let income = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      if (income) {
        res.json(income);
      } else {
        res.json(0);
      }
    } catch (error) {
      res.json(0);
    }
  } else if (
    account === "Todas as Contas" &&
    category === "Todas as Categorias"
  ) {
    try {
      const list = await Transaction.find({
        userId: req.userId,
        transactionStatus: true,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionType: "income",
      });
      const income = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      if (income) {
        res.json(income);
      } else {
        res.json(0);
      }
    } catch (error) {
      res.json(0);
    }
  } else {
    try {
      const list = await Transaction.find({
        userId: req.userId,
        transactionStatus: true,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionType: "income",
        transactionAccount: account,
        transactionCategory: category,
      });
      const income = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      if (income) {
        res.json(income);
      } else {
        res.json(0);
      }
    } catch (error) {
      res.json(0);
    }
  }
};

//Expense

export const getExpenseForMonth = async (req: Request, res: Response) => {
  const date = req.body.date;
  const firstDate = `${date}-01`;
  const lastDate = `${date}-31`;
  const { account, category } = req.body;
  if (category === "Todas as Categorias" && account !== "Todas as Contas") {
    try {
      const list = await Transaction.find({
        userId: req.userId,
        transactionStatus: true,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionType: "expense",
        transactionAccount: account,
      });
      const expense = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      if (expense) {
        res.json(expense);
      } else {
        res.json(0);
      }
    } catch (error) {
      res.json(0);
    }
  } else if (
    account === "Todas as Contas" &&
    category !== "Todas as Categorias"
  ) {
    try {
      const list = await Transaction.find({
        userId: req.userId,
        transactionStatus: true,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionType: "expense",
        transactionCategory: category,
      });
      const expense = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      if (expense) {
        res.json(expense);
      } else {
        res.json(0);
      }
    } catch (error) {
      res.json(0);
    }
  } else if (
    account === "Todas as Contas" &&
    category === "Todas as Categorias"
  ) {
    try {
      const list = await Transaction.find({
        userId: req.userId,
        transactionStatus: true,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionType: "expense",
      });
      const expense = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      if (expense) {
        res.json(expense);
      } else {
        res.json(0);
      }
    } catch (error) {
      res.json(0);
    }
  } else {
    try {
      const list = await Transaction.find({
        userId: req.userId,
        transactionStatus: true,
        transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
        transactionType: "expense",
        transactionAccount: account,
        transactionCategory: category,
      });
      const expense = list
        .map((item) => item.transactionValue)
        .reduce((total, item) => (total += item));
      if (expense) {
        res.json(expense);
      } else {
        res.json(0);
      }
    } catch (error) {
      res.json(0);
    }
  }
};

export const reverseTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Tstatus } = req.body;

  try {
    await Transaction.updateOne({ _id: id }, { transactionStatus: false });
    res.json({});
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const removeTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Transaction.findByIdAndDelete({ _id: id });
};

//profit

export const getIncomeProfit = async (req: Request, res: Response) => {
  const account = req.body.account;
  try {
    const listIncome = await Transaction.find({
      userId: req.userId,
      transactionStatus: true,
      transactionType: "income",
      transactionAccount: account,
    });

    const income = listIncome
      .map((item) => item.transactionValue)
      .reduce((total, item) => (total += item));
    res.json(income);
  } catch (error) {
    res.json(0);
  }
};

export const getExpenseProfit = async (req: Request, res: Response) => {
  const account = req.body.account;
  try {
    const listExpense = await Transaction.find({
      userId: req.userId,
      transactionStatus: true,
      transactionType: "expense",
      transactionAccount: account,
    });

    const expense = listExpense
      .map((item) => item.transactionValue)
      .reduce((total, item) => (total += item));

    res.json(expense);
  } catch (error) {
    res.json(0);
  }
};

//Bills to pay

export const billsToPay = async (req: Request, res: Response) => {
  try {
    const list = await Transaction.find({
      userId: req.userId,
      transactionStatus: false,
      transactionType: "expense",
    }).sort({ transactionDate: 1 });
    res.json(list);
  } catch (error) {
    res.json(error);
  }
};

export const updateBillsToPay = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { value, account, Tstatus, paymentDate } = req.body;
  if (value && account && Tstatus && paymentDate) {
    try {
      const updated = await Transaction.updateOne(
        { _id: id },
        {
          transactionValue: value,
          transactionAccount: account,
          transactionStatus: Tstatus,
          transactionPaymentDate: paymentDate,
        }
      );
      res.json(updated);
    } catch (error) {
      res.json(error);
    }
  }
};

//BillsToReceive

export const billsToReceive = async (req: Request, res: Response) => {
  try {
    const list = await Transaction.find({
      userId: req.userId,
      transactionStatus: false,
      transactionType: "income",
    }).sort({ transactionDate: -1 });
    res.json(list);
  } catch (error) {
    res.json(error);
  }
};

export const updateBillsToReceive = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { value, account, Tstatus, paymentDate } = req.body;
  if (value && account && Tstatus && paymentDate) {
    try {
      const updated = await Transaction.updateOne(
        { _id: id },
        {
          transactionValue: value,
          transactionAccount: account,
          transactionStatus: Tstatus,
          transactionPaymentDate: paymentDate,
        }
      );
      res.json(updated);
    } catch (error) {
      res.json(error);
    }
  }
};

export const billsId = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const list = await Transaction.findById({ _id: id });
    res.json(list);
  } catch (error) {
    res.json(error);
  }
};
