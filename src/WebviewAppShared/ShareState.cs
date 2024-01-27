using System.Collections.Generic;
using System.ComponentModel;

namespace WebviewAppShared
{
    public class ShareState : INotifyPropertyChanged
    {
        Dictionary<string, object> _proList;
        public void ShowFileDialog()
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(ShowFileDialog)));
        }

        public void ClearModels()
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(ClearModels)));
        }

        public Dictionary<string, object> PropertyList
        {
            set
            {
                _proList = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(PropertyList)));
            }
            get
            {
                return _proList;
            }

        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
