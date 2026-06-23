import { useState, useEffect } from "react";
import "./Documents.css";

import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../../services/documentService";

import {
  getInvestors,
} from "../../services/investorService";

import { supabase }
from "../../services/supabase";

function Documents() {

  const [documents, setDocuments] =
    useState([]);

  const [investors, setInvestors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      investor_id: "",

      category: "Pitch Deck",

      description: "",

      status: "Active",

    });

  /* ==========================
     LOAD DATA
  ========================== */

  const loadData =
    async () => {

      try {

        setLoading(true);

        const [
          documentsResult,
          investorsResult,
        ] = await Promise.all([

          getDocuments(),

          getInvestors(),

        ]);

        setDocuments(
          documentsResult.data || []
        );

        setInvestors(
          investorsResult.data || []
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    const fetchData =
      async () => {

        await loadData();

      };

    fetchData();

  }, []);

  /* ==========================
     INPUT CHANGE
  ========================== */

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  /* ==========================
     FILE SELECT
  ========================== */

  const handleFileChange =
    (e) => {

      if (
        e.target.files &&
        e.target.files[0]
      ) {

        setSelectedFile(
          e.target.files[0]
        );

      }

    };

  /* ==========================
     FILE UPLOAD
  ========================== */

  const uploadFile =
    async () => {

      if (!selectedFile)
        return null;

      setUploading(true);

      try {

        const fileName =
          `${Date.now()}-${selectedFile.name}`;

        const { error } =
          await supabase.storage
            .from("documents")
            .upload(
              fileName,
              selectedFile
            );

        if (error) {

          alert(
            error.message
          );

          return null;

        }

        const { data } =
          supabase.storage
            .from("documents")
            .getPublicUrl(
              fileName
            );

        return {

          fileUrl:
            data.publicUrl,

          fileName:
            selectedFile.name,

          fileSize:
            (
              selectedFile.size /
              1024
            ).toFixed(2) + " KB",

          fileType:
            selectedFile.type,

        };

      } finally {

        setUploading(false);

      }

    };

      /* ==========================
     RESET FORM
  ========================== */

  const resetForm =
    () => {

      setEditingId(null);

      setSelectedFile(null);

      setFormData({

        investor_id: "",

        category: "Pitch Deck",

        description: "",

        status: "Active",

      });

    };

  /* ==========================
     CREATE / UPDATE
  ========================== */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {

        alert(
          "Please login first"
        );

        return;

      }

      try {

        let payload;

        if (editingId) {

          payload = {

            ...formData,

            user_id:
              user.id,

          };

          const result =
            await updateDocument(
              editingId,
              payload
            );

          if (
            result.error
          ) {

            alert(
              result.error
                .message
            );

            return;

          }

        } else {

          if (
            !selectedFile
          ) {

            alert(
              "Please select a file"
            );

            return;

          }

          const uploadData =
            await uploadFile();

          if (
            !uploadData
          ) {

            return;

          }

          payload = {

            ...formData,

            user_id:
              user.id,

            file_name:
              uploadData.fileName,

            file_url:
              uploadData.fileUrl,

            file_size:
              uploadData.fileSize,

            file_type:
              uploadData.fileType,

          };

          const result =
            await createDocument(
              payload
            );

          if (
            result.error
          ) {

            alert(
              result.error
                .message
            );

            return;

          }

        }

        resetForm();

        loadData();

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Failed to save document"
        );

      }

    };

  /* ==========================
     EDIT DOCUMENT
  ========================== */

  const handleEdit =
    (document) => {

      setEditingId(
        document.id
      );

      setFormData({

        investor_id:
          document.investor_id || "",

        category:
          document.category || "",

        description:
          document.description || "",

        status:
          document.status || "Active",

      });

    };

  /* ==========================
     DELETE DOCUMENT
  ========================== */

  const handleDelete =
    async (
      id,
      fileUrl
    ) => {

      const confirmDelete =
        window.confirm(
          "Delete document?"
        );

      if (
        !confirmDelete
      )
        return;

      try {

        if (
          fileUrl
        ) {

          const path =
            fileUrl
              .split(
                "/documents/"
              )[1];

          if (
            path
          ) {

            await supabase
              .storage
              .from(
                "documents"
              )
              .remove([
                path,
              ]);

          }

        }

        const {
          error,
        } =
          await deleteDocument(
            id
          );

        if (
          error
        ) {

          alert(
            error.message
          );

          return;

        }

        loadData();

      } catch (
        error
      ) {

        console.error(
          error
        );

      }

    };

  /* ==========================
     SEARCH
  ========================== */

  const filteredDocuments =
    documents.filter(
      (doc) =>

        doc.file_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        doc.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        doc.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  /* ==========================
     STATS
  ========================== */

  const totalDocuments =
    documents.length;

  const activeDocuments =
    documents.filter(
      doc =>
        doc.status ===
        "Active"
    ).length;

  const archivedDocuments =
    documents.filter(
      doc =>
        doc.status ===
        "Archived"
    ).length;

      /* ==========================
     LOADING
  ========================== */

  if (loading) {

    return (

      <div className="documents-page">

        <h2>
          Loading Documents...
        </h2>

      </div>

    );

  }

  return (

    <div className="documents-page">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="page-header">

        <h1>
          Documents Manager
        </h1>

        <p>
          Upload, organize and manage
          startup documents securely.
        </p>

      </div>

      {/* ==========================
          STATS
      ========================== */}

      <div className="stats-grid">

        <div className="stat-card">

          <h3>
            Total Documents
          </h3>

          <h2>
            {totalDocuments}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Active
          </h3>

          <h2>
            {activeDocuments}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Archived
          </h3>

          <h2>
            {archivedDocuments}
          </h2>

        </div>

      </div>

      {/* ==========================
          DOCUMENT FORM
      ========================== */}

      <div className="document-form-card">

        <h2>

          {editingId
            ? "Update Document"
            : "Upload Document"}

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="form-grid">

            {/* INVESTOR */}

            <select
              name="investor_id"
              value={
                formData.investor_id
              }
              onChange={
                handleChange
              }
            >

              <option value="">
                Select Investor
              </option>

              {investors.map(
                (investor) => (

                  <option
                    key={
                      investor.id
                    }
                    value={
                      investor.id
                    }
                  >

                    {investor.name}

                  </option>

                )
              )}

            </select>

            {/* CATEGORY */}

            <select
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
            >

              <option>
                Pitch Deck
              </option>

              <option>
                Business Plan
              </option>

              <option>
                Financial Report
              </option>

              <option>
                NDA
              </option>

              <option>
                Contract
              </option>

              <option>
                Investor Agreement
              </option>

              <option>
                Meeting Notes
              </option>

              <option>
                Presentation
              </option>

              <option>
                Other
              </option>

            </select>

            {/* STATUS */}

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
            >

              <option>
                Active
              </option>

              <option>
                Archived
              </option>

            </select>

          </div>

          {/* FILE PICKER */}

          {!editingId && (

            <div className="file-upload-box">

              <label>

                Select File

              </label>

              <input
                type="file"
                onChange={
                  handleFileChange
                }
                required
              />

              {selectedFile && (

                <div
                  className="selected-file"
                >

                  {selectedFile.name}

                </div>

              )}

            </div>

          )}

          {/* DESCRIPTION */}

          <textarea
            rows="5"
            name="description"
            placeholder="Document Description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
            className="save-btn"
            disabled={
              uploading
            }
          >

            {uploading
              ? "Uploading..."
              : editingId
              ? "Update Document"
              : "Upload Document"}

          </button>

        </form>

      </div>
            {/* ==========================
          SEARCH
      ========================== */}

      <div className="search-card">

        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="search-input"
        />

      </div>

      {/* ==========================
          DOCUMENTS TABLE
      ========================== */}

      <div className="table-card">

        <table className="document-table">

          <thead>

            <tr>

              <th>
                File Name
              </th>

              <th>
                Category
              </th>

              <th>
                Type
              </th>

              <th>
                Size
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredDocuments.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign:
                      "center",
                  }}
                >

                  No documents found

                </td>

              </tr>

            ) : (

              filteredDocuments.map(
                (document) => (

                  <tr
                    key={
                      document.id
                    }
                  >

                    <td>

                      {
                        document.file_name
                      }

                    </td>

                    <td>

                      {
                        document.category
                      }

                    </td>

                    <td>

                      {
                        document.file_type
                      }

                    </td>

                    <td>

                      {
                        document.file_size
                      }

                    </td>

                    <td>

                      {
                        document.status
                      }

                    </td>

                    <td
                      className="action-buttons"
                    >

                      <a
                        href={
                          document.file_url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="view-btn"
                      >

                        View

                      </a>

                      <a
                        href={
                          document.file_url
                        }
                        download
                        className="download-btn"
                      >

                        Download

                      </a>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(
                            document
                          )
                        }
                      >

                        Edit

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            document.id,
                            document.file_url
                          )
                        }
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                )

              )

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Documents;