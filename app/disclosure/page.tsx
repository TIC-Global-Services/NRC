"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Reusable/Container";
import { X } from "lucide-react";

interface DocItem {
  label: string;
  url?: string; // Direct file (single PDF)
  files?: string[]; // Multiple PDFs (show inside modal)
}

interface Category {
  title: string;
  items: DocItem[];
}

const categories: Category[] = [
  {
    title: "PMS",
    items: [
      {
        label: "Investor Charter",
        url: "/disclosure/pms/Investor_charter/Investor_charter_PMS.pdf",
      },
      {
        label: "Disclosure Documents",
        files: ["/disclosure/pms/Disclosure_Docs/Disclosure May 2024.pdf"],
      },
      {
        label: "Investor Complaints",
        files: [

          //2025
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_Oct_2025.pdf",
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_Sept_2025.pdf",
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_August_2025.pdf",
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_July2025.pdf",
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_June25.pdf",
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_May25.pdf",
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_April25.pdf",
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_March25.pdf",
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_feb25.pdf",
          "/disclosure/pms/Investor_complaint/2025/Investor_Complain_Jan2025.pdf",

          //2024
          "/disclosure/pms/Investor_complaint/2024/Investor_Complain_Dec_2024.pdf",
          "/disclosure/pms/Investor_complaint/2024/Investor_Complain_Nov_2024.pdf",
          "/disclosure/pms/Investor_complaint/2024/Investor_Complain_October_2024.pdf",
          "/disclosure/pms/Investor_complaint/2024/Investor_Complain_August_2024.pdf",
          "/disclosure/pms/Investor_complaint/2024/Investor_Complain_July_2024.pdf",
          "/disclosure/pms/Investor_complaint/2024/Investor_Complain_June_2024.pdf",
          "/disclosure/pms/Investor_complaint/2024/Investor_Complain_May_2024.pdf",
          "/disclosure/pms/Investor_complaint/2024/Investor_Complain_April_2024.pdf",
        ],
      },
      {
        label: "Fee Calculator",
        url: "/disclosure/pms/Fee_Calculator/Fee Calculation Tool.xlsx",
      },
    ],
  },

  {
    title: "AIF",
    items: [
      {
        label: "Investor Charter",
        url: "/disclosure/aif/Investor_charter/Investor-Charter_AIF_Nine River.pdf",
      },
      {
        label: "Stewardship Policy",
        url: "/disclosure/aif/Steward_policy/Policy on Stewardship Responsibilities - R.pdf",
      },
    ],
  },

  {
    title: "Others",
    items: [
      {
        label: "SEBI Circular for Online Disputes Resolution",
        url: "/disclosure/others/SEBI-Circular-for-Online-Resolution-of-Disputes-(ODR)-in-the-Indian-Securities-Market.pdf",
      },
      {
        label: "Grievance Redressal",
        url: "/disclosure/others/Grievance redressal and dispute settlement policy.pdf",
      },
      {
        label: "Investor Education",
        url: "/disclosure/others/Investor Education.pdf",
      },
      {
        label: "Annual Return FY 24",
        url: "/disclosure/others/annual-return-fy24.pdf",
      },
      {
        label: "Corporate Social Responsibility",
        files: [
          "/disclosure/others/csr/CSR-Policy.pdf",
          "/disclosure/others/csr/CSR-Projects.pdf",
          "/disclosure/others/csr/Form_MGT_7A_Nine Rivers_23_signed.pdf",
        ],
      },
    ],
  },
];

const DisclosurePage = () => {
  const [modalFiles, setModalFiles] = useState<string[] | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (title: string, files: string[]) => {
    setModalTitle(title);
    setModalFiles(files);
  };

  const closeModal = () => {
    setModalFiles(null);
  };

  const getFileName = (path: string) => {
    return path.split("/").pop() || path;
  };

  return (
    <div className="bg-white pt-24 pb-20">
      <Container disableYSpacing>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Page Title */}
          <h1 className="text-[28px] md:text-[40px] font-normal mb-6 text-center leading-tight">
            Disclosure <span className="text-primary">Documents</span>
          </h1>

          <div className="h-[2px] w-20 bg-primary mx-auto mb-14 opacity-60"></div>

          {/* Categories */}
          <div className="space-y-14">
            {categories.map((category, i) => (
              <div key={i}>
                <h2 className="text-[22px] md:text-[26px] font-semibold mb-6 text-primary">
                  {category.title}
                </h2>

                {/* GRID LAYOUT */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="aspect-square flex flex-col items-start justify-between p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer shadow-sm hover:shadow-md"
                    >
                      {/* Title */}
                      <div className="text-[16px] md:text-[18px] text-secondary font-medium leading-snug">
                        {item.label}
                      </div>

                      {/* CTA */}
                      {item.url ? (
                        <a
                          href={item.url}
                          download
                          className="text-primary font-semibold text-sm mt-4"
                        >
                          Download
                        </a>
                      ) : (
                        <button
                          onClick={() =>
                            openModal(item.label, item.files || [])
                          }
                          className="text-primary font-semibold text-sm mt-4"
                        >
                          View Documents
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Modal */}
      <AnimatePresence>
        {modalFiles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="
          bg-white rounded-xl w-full max-w-4xl shadow-xl 
          max-h-[85vh] overflow-hidden
        "
            >
              {/* HEADER */}
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-semibold text-primary">
                  {modalTitle}
                </h3>
                <button onClick={closeModal}>
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* SCROLLABLE CONTENT */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {modalFiles.map((file, idx) => (
                    <a
                      key={idx}
                      href={file}
                      download
                      className="
                  aspect-square flex flex-col items-center justify-center 
                  border rounded-xl bg-gray-50 hover:bg-gray-100 
                  transition text-center text-sm font-medium 
                  shadow-sm hover:shadow-md p-3
                "
                    >
                      {getFileName(file)}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DisclosurePage;
