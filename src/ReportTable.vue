<template>
  <v-container>
    
    <v-data-table
  :headers="headers"
  :items="filteredReports"
  class="elevation-1"
  item-value="transactionId"  
  dense
  :search="search"
>
  <template v-slot:top>
    <v-text-field
      v-model="search"
      label="Search Account Holder"
      clearable
      class="mx-4"
    />

    
    <v-select
      v-model="transactionTypeFilter"
      :items="transactionTypes"
      label="Transaction Type"
      clearable
      class="mx-4"
    />

    <!-- Export Buttons -->
    <v-btn @click="exportToExcel(filteredReports)" color="primary" class="mx-2">
      Export to Excel
    </v-btn>
    <v-btn @click="exportToPDF(filteredReports)" color="secondary" class="mx-2">
      Export to PDF
    </v-btn>
  </template>
</v-data-table>

  </v-container>
</template>

<script>
import * as XLSX from "xlsx";
import jsPDF from "jspdf";   
import "jspdf-autotable";    

export default {
  data() {
    return {
      headers: [
        { text: "Transaction ID", value: "transactionId" },
        { text: "Date", value: "date" },
        { text: "Account Holder Name", value: "accountHolderName" },
        { text: "Transaction Type", value: "transactionType" },
        { text: "Amount", value: "amount" },
        { text: "Account Balance", value: "accountBalance" },
      ],
      reports: [
        
        {
          transactionId: "T001",
          date: "2024-12-20",
          accountHolderName: "Jane Doe",
          transactionType: "Deposit",
          amount: 500,
          accountBalance: 1500,
        },
        {
          transactionId: "T002",
          date: "2024-12-19",
          accountHolderName: "John Smith",
          transactionType: "Withdrawal",
          amount: 200,
          accountBalance: 800,
        },
      ],
      search: "",
      transactionTypeFilter: null,
      transactionTypes: ["Deposit", "Withdrawal", "Loan Payment"],
    };
  },
  computed: {
    filteredReports() {
      return this.reports.filter((report) => {
        const matchesSearch =
          this.search === "" ||
          report.accountHolderName
            .toLowerCase()
            .includes(this.search.toLowerCase());
        const matchesType =
          !this.transactionTypeFilter ||
          report.transactionType === this.transactionTypeFilter;
        return matchesSearch && matchesType;
      });
    },
  },
  methods: {
    // Export to Excel
    exportToExcel(data) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
      XLSX.writeFile(workbook, "FinancialReports.xlsx");
    },

    // Export to PDF
    exportToPDF(data) {
      const doc = new jsPDF();
      doc.text("Financial Reports", 20, 10);
      
      // Add table rows dynamically
      const headers = [
        "Transaction ID",
        "Date",
        "Account Holder Name",
        "Transaction Type",
        "Amount",
        "Account Balance",
      ];
      const rows = data.map((item) => [
        item.transactionId,
        item.date,
        item.accountHolderName,
        item.transactionType,
        item.amount,
        item.accountBalance,
      ]);

      doc.autoTable({
        head: [headers],
        body: rows,
      });

      doc.save("FinancialReports.pdf");
    },
  },
};
</script>

<style scoped>

</style>
