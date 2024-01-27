namespace IFCjsWinFormsApp
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            var resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            blazorWebView1 = new Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView();
            menuStrip1 = new System.Windows.Forms.MenuStrip();
            fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            loadModelToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            unloadModelsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            splitContainer1 = new System.Windows.Forms.SplitContainer();
            lsProList = new System.Windows.Forms.ListView();
            Key = new System.Windows.Forms.ColumnHeader();
            Value = new System.Windows.Forms.ColumnHeader();
            label1 = new System.Windows.Forms.Label();
            menuStrip1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)splitContainer1).BeginInit();
            splitContainer1.Panel1.SuspendLayout();
            splitContainer1.Panel2.SuspendLayout();
            splitContainer1.SuspendLayout();
            SuspendLayout();
            // 
            // blazorWebView1
            // 
            blazorWebView1.Dock = System.Windows.Forms.DockStyle.Fill;
            blazorWebView1.Location = new System.Drawing.Point(0, 0);
            blazorWebView1.Margin = new System.Windows.Forms.Padding(2, 1, 2, 1);
            blazorWebView1.Name = "blazorWebView1";
            blazorWebView1.Size = new System.Drawing.Size(1271, 825);
            blazorWebView1.StartPath = "/";
            blazorWebView1.TabIndex = 20;
            // 
            // menuStrip1
            // 
            menuStrip1.ImageScalingSize = new System.Drawing.Size(24, 24);
            menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] { fileToolStripMenuItem });
            menuStrip1.Location = new System.Drawing.Point(0, 0);
            menuStrip1.Name = "menuStrip1";
            menuStrip1.Padding = new System.Windows.Forms.Padding(4, 1, 0, 1);
            menuStrip1.Size = new System.Drawing.Size(1579, 24);
            menuStrip1.TabIndex = 21;
            menuStrip1.Text = "menuStrip1";
            // 
            // fileToolStripMenuItem
            // 
            fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { loadModelToolStripMenuItem, unloadModelsToolStripMenuItem });
            fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            fileToolStripMenuItem.Size = new System.Drawing.Size(37, 22);
            fileToolStripMenuItem.Text = "File";
            // 
            // loadModelToolStripMenuItem
            // 
            loadModelToolStripMenuItem.Name = "loadModelToolStripMenuItem";
            loadModelToolStripMenuItem.Size = new System.Drawing.Size(154, 22);
            loadModelToolStripMenuItem.Text = "Load Model";
            loadModelToolStripMenuItem.Click += LoadModelToolStripMenuItem_Click;
            // 
            // unloadModelsToolStripMenuItem
            // 
            unloadModelsToolStripMenuItem.Name = "unloadModelsToolStripMenuItem";
            unloadModelsToolStripMenuItem.Size = new System.Drawing.Size(154, 22);
            unloadModelsToolStripMenuItem.Text = "Unload Models";
            unloadModelsToolStripMenuItem.Click += unloadModelsToolStripMenuItem_Click;
            // 
            // splitContainer1
            // 
            splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            splitContainer1.Location = new System.Drawing.Point(0, 24);
            splitContainer1.Name = "splitContainer1";
            // 
            // splitContainer1.Panel1
            // 
            splitContainer1.Panel1.Controls.Add(blazorWebView1);
            // 
            // splitContainer1.Panel2
            // 
            splitContainer1.Panel2.Controls.Add(lsProList);
            splitContainer1.Panel2.Controls.Add(label1);
            splitContainer1.Size = new System.Drawing.Size(1579, 825);
            splitContainer1.SplitterDistance = 1271;
            splitContainer1.TabIndex = 22;
            // 
            // lsProList
            // 
            lsProList.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] { Key, Value });
            lsProList.Dock = System.Windows.Forms.DockStyle.Fill;
            lsProList.Location = new System.Drawing.Point(0, 15);
            lsProList.Name = "lsProList";
            lsProList.Size = new System.Drawing.Size(304, 810);
            lsProList.TabIndex = 1;
            lsProList.UseCompatibleStateImageBehavior = false;
            lsProList.View = System.Windows.Forms.View.Details;
            // 
            // Key
            // 
            Key.Text = "Key";
            Key.Width = 200;
            // 
            // Value
            // 
            Value.Text = "Value";
            Value.Width = 200;
            // 
            // label1
            // 
            label1.Dock = System.Windows.Forms.DockStyle.Top;
            label1.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold);
            label1.Location = new System.Drawing.Point(0, 0);
            label1.Name = "label1";
            label1.Size = new System.Drawing.Size(304, 15);
            label1.TabIndex = 2;
            label1.Text = "Double click on any entity to see its attributes";
            // 
            // MainForm
            // 
            AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            ClientSize = new System.Drawing.Size(1579, 849);
            Controls.Add(splitContainer1);
            Controls.Add(menuStrip1);
            Icon = (System.Drawing.Icon)resources.GetObject("$this.Icon");
            MainMenuStrip = menuStrip1;
            Margin = new System.Windows.Forms.Padding(2, 1, 2, 1);
            Name = "MainForm";
            Text = "IFCjs Desktop viewer";
            WindowState = System.Windows.Forms.FormWindowState.Maximized;
            Load += MainForm_Load;
            menuStrip1.ResumeLayout(false);
            menuStrip1.PerformLayout();
            splitContainer1.Panel1.ResumeLayout(false);
            splitContainer1.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)splitContainer1).EndInit();
            splitContainer1.ResumeLayout(false);
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView blazorWebView1;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem loadModelToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem unloadModelsToolStripMenuItem;
        private System.Windows.Forms.SplitContainer splitContainer1;
        private System.Windows.Forms.ListView lsProList;
        private System.Windows.Forms.ColumnHeader Key;
        private System.Windows.Forms.ColumnHeader Value;
        private System.Windows.Forms.Label label1;
    }
}
