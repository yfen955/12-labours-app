<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, i) in breadcrumb.slice(0, breadcrumb.length - 1)"
        :key="i"
      >
        <span class="hyperlink" @click="handlePath(item.to)">{{
          item.label
        }}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item class="title">{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      :data="files_data"
      v-loading="isLoadingFile"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      :cell-style="{ padding: '1rem 0 1rem' }"
    >
      <el-table-column prop="name" label="Name">
        <template slot-scope="scope">
          <span class="table-content">
            <i class="el-icon-folder" v-if="scope.row.type === 'Folder'"></i>
            <i class="el-icon-document" v-else></i>
            <el-popover
              placement="right"
              trigger="hover"
              :content="
                scope.row.name[0].toUpperCase() + scope.row.name.slice(1)
              "
            >
              <a
                slot="reference"
                class="filename-btn"
                @click="updateFilesData(scope.row.path, scope.row.type)"
              >
                {{ scope.row.name[0].toUpperCase() + scope.row.name.slice(1) }}
              </a>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="Type"></el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <p v-if="scope.row.type === 'Folder'">-</p>
          <div v-else>
            <el-button @click="downloadFile(scope.row.path)" class="icon-btn"
              ><i class="el-icon-download"></i
            ></el-button>
            <el-button @click="showSegmentation('case1')" class="icon-btn"
              ><i class="el-icon-first-aid-kit"></i
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import backendQuery from "@/services/backendQuery";

export default {
  name: "FilesBreadcrumb",
  data: () => {
    return {
      isLoadingFile: false,
      get_file_path: "",
      files_data: [],
      breadcrumb: [
        {
          to: "files",
          label: "files",
        },
      ],
    };
  },

  created: function() {
    this.get_file_path = `${this.$config.query_api_url}/collection`;
    let file_path = `/${this.$route.params.id}`;
    if (
      this.$route.query.path &&
      this.$route.query.path.length > "files".length
    ) {
      // remove 'files'
      file_path = file_path + `${this.$route.query.path.slice(5)}`;
      this.generateFilesBreadcrumb(this.$route.query.path);
    }
    this.updateFilesData(file_path);
  },

  watch: {
    "$route.query.path": {
      handler(new_val, old_val) {
        let file_path = `/${this.$route.params.id}`;
        if (this.breadcrumb[this.breadcrumb.length - 1].to !== new_val) {
          if (new_val && new_val !== "files")
            file_path =
              file_path + `/${new_val.slice(new_val.indexOf("/") + 1)}`;
          this.updateFilesData(file_path, "Folder", old_val);
        }
      },
    },
  },

  computed: {
    title: function() {
      return this.breadcrumb[this.breadcrumb.length - 1].label;
    },
  },

  methods: {
    generateFilesBreadcrumb(fullpath) {
      let path = "files";
      fullpath.split("/").forEach((item) => {
        if (item !== "files") {
          path = path + "/" + item;
          this.breadcrumb.push({
            to: path,
            label: item,
          });
        }
      });
    },

    handleFilesData(data) {
      data.folders.forEach((item) => {
        let folder = {
          name: item.name,
          path: item.path,
          type: "Folder",
        };
        this.files_data.push(folder);
      });
      data.files.forEach((item) => {
        let file = {
          name: item.name,
          path: item.path,
          type: "File",
        };
        this.files_data.push(file);
      });
    },

    async updateFilesData(
      path,
      type = "Folder",
      old_path = this.$route.query.path
    ) {
      if (type === "Folder") {
        this.isLoadingFile = true;
        let folder_path = "files";
        if (path.split("/").length > 2)
          // if path is longer than '/dataset-id', e.g. '/dataset-id/derivative'
          folder_path =
            folder_path +
            `/${path.slice(
              path.indexOf(this.$route.params.id) +
                this.$route.params.id.length +
                1
            )}`;
        if (old_path && folder_path.length < old_path.length) {
          this.breadcrumb = this.breadcrumb.filter((item) => {
            if (folder_path.indexOf(item.label) > -1) return item;
          });
        } else if (old_path && folder_path.length > old_path.length) {
          this.breadcrumb.push({
            to: folder_path,
            label: path.slice(path.lastIndexOf("/") + 1),
          });
        }
        this.$router.push({
          path: `${this.$route.path}`,
          query: {
            datasetTab: `${this.$route.query.datasetTab}`,
            path: folder_path,
          },
        });
        this.files_data = [];
        let new_files = await backendQuery.fetchFiles(this.get_file_path, path, this.$config.query_access_token);
        this.handleFilesData(new_files);
        this.isLoadingFile = false;
      } else {
        this.downloadFile(path);
      }
    },

    handlePath(path) {
      let file_path = `/${this.$route.params.id}`;
      if (path.length > "files".length)
        // remove 'files'
        file_path = file_path + `${path.slice(5)}`;
      this.updateFilesData(file_path);
    },

    async downloadFile(path) {
      const endpoint = `${this.$config.query_api_url}/data/download`;
      await backendQuery.fetchOneOffToken(this.$config.query_api_url, this.$config.query_access_token);
      let file_path = path.slice(path.indexOf(`${this.$route.params.id}`));
      const oneOffToken = backendQuery.getLocalStorage("one_off_token");
      let download_path = endpoint + `/${file_path}` + `?token=${oneOffToken}`;
      window.open(download_path, "_self");
    },

    showSegmentation(id) {
      // window.open(`http://localhost:5173/NRRD_Segmentation_Tool/#/${id}`, '_blank');
      this.$router.push({ path: "/incomplete" });
    },
  },
};
</script>

<style scoped lang="scss">
.hyperlink {
  color: $app-secondary-color;
  text-decoration: underline;
  cursor: pointer;
}
.el-breadcrumb__item {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}
.table-content {
  white-space: nowrap;
  .filename-btn {
    color: $app-primary-color !important;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
}
.icon-btn {
  background: $app-primary-color;
  border-radius: 50%;
  padding: 0;
  margin: 0;
  height: 1.5rem;
  width: 1.5rem;
  font-size: large;
}
</style>
